import arrowBack from "@/../public/images/arrowGreen.svg";
import notiNone from "@/../public/images/notiNone.svg";
import Portal from "@/components/commons/Modal/Portal";
import { getNoti, getNotiCount, readNoti } from "@/lib/apis/noti";
import { notiAtom } from "@/lib/atoms/userAtom";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./MyPageNoti.module.scss";
import NotiItem from "./NotiItem";

const cn = classNames.bind(styles);

export default function MyPageNoti({ closeBtn }: any) {
  const [lastId, setLastId] = useState<number>(-1);
  const [notis, setNotis] = useState<any[]>([]);
  const [isNoti, setIsNoti] = useAtom(notiAtom);

  const { data: unReadCount = 0 } = useQuery({
    queryKey: ["unReadCounts"],
    queryFn: getNotiCount,
  });

  // Infinite Query 설정
  const {
    data: notiData,
    fetchNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["notiDatas", lastId],
    queryFn: () => getNoti(lastId),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const notificationDetails = lastPage?.notificationDetails;
      return notificationDetails?.length >= 20
        ? notificationDetails[notificationDetails.length - 1].notificationId
        : undefined;
    },
    enabled: !!unReadCount || unReadCount === 0,
  });

  // 읽음 처리 Mutation
  const { mutate: read } = useMutation({
    mutationFn: () => readNoti(),
  });

  // 컴포넌트 첫 렌더 시 알림 읽음 처리
  useEffect(() => {
    setNotis([]);
    read();
    setIsNoti(false);
  }, []);

  // notiData 업데이트 시 새로운 알림 데이터 추가
  useEffect(() => {
    if (notiData?.pages) {
      const newNotis = notiData.pages.flatMap(
        (page) => page.notificationDetails
      );
      // 중복된 알림을 제거하는 로직
      setNotis((prev) => {
        const combinedNotis = [...newNotis, ...prev];
        const uniqueNotis = Array.from(
          new Set(combinedNotis.map((item) => item.notificationId))
        ).map((id) => combinedNotis.find((item) => item.notificationId === id));
        return uniqueNotis;
      });
    }
  }, [notiData]);

  // IntersectionObserver 설정
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Load more triggered");
          const lastPage = notiData?.pages[notiData.pages.length - 1];
          if (lastPage?.notificationDetails?.length >= 20) {
            setLastId(
              lastPage.notificationDetails[
                lastPage.notificationDetails.length - 1
              ]?.notificationId
            );
          }
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, []);

  const ref = useRef(null);
  useOnClickOutside(ref, closeBtn);

  return (
    <Portal>
      <div className={cn("modal")}>
        <div className={cn("notiWrap")} ref={ref}>
          <div className={cn("bar")}>
            <Image
              src={arrowBack}
              alt="이전으로"
              width={8}
              height={16}
              onClick={closeBtn}
            />
            <div>
              알림 <div className={cn("notiCount")}>{unReadCount}건</div>
            </div>
            <span></span>
          </div>

          <div className={cn("notiBack")}>
            {notis.length > 0 ? (
              <div className={cn("notiItemBox")}>
                {notis.map((item: any, index: number) => (
                  <NotiItem item={item} key={index} setNotis={setNotis} />
                ))}
                <div ref={target} className={cn("refBox")}></div>
              </div>
            ) : (
              <div className={cn("notiNone")}>
                <Image
                  src={notiNone}
                  alt="알림이 없습니다."
                  width={79}
                  height={79}
                />
                <p>새로운 알림이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
}
