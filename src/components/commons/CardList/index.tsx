import nologin from "@/../public/images/mypageNologin.svg";
import { getMembersTimeline } from "@/lib/apis/members";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import Card from "../Card";
import styles from "./CardList.module.scss";
import { BinDetail } from "@/lib/atoms/binAtom";
import { useRouter } from "next/router";

const cn = classNames.bind(styles);

export type Status = "REJECTED" | "APPROVED" | "PENDING";
export interface CardProps {
  binId: number;
  title: string;
  address: string;
  type: string;
  status: string;
  createdAt: string;
  bookmarkCount: number;
  isAdmin?: boolean;
  admin: boolean;
  nickname?: string;
  complaintCount?: number;
}

export default function CardList() {
  const router = useRouter();
  const { data: cardLists } = useQuery({
    queryKey: ["cardList"],
    queryFn: getMembersTimeline,
  });
  const handleClickCard = (id: string) => {
    router.push(router.route + "/detail/" + id);
  };
  return (
    <ul className={cn("card-list")}>
      {cardLists === null ? (
        <div className={cn("card-nologin")}>
          <Image src={nologin} alt="로그인해주세요" width={79} height={79} />
          로그인 후 이용 가능합니다.
        </div>
      ) : (
        cardLists?.map((item: any) => (
          <li key={item.binId} onClick={() => handleClickCard(item.binId)}>
            <Card admin={false} {...item} />
          </li>
        ))
      )}
    </ul>
  );
}
