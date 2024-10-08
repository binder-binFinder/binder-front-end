import nologin from "@/../public/images/mypageNologin.svg";
import { getMembersTimeline } from "@/lib/apis/members";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import CardSkel from "../../Skeleton/CardSkel";
import Card from "../Card";
import styles from "./CardList.module.scss";

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
  isDeleted?: boolean;
}

export default function CardList() {
  const router = useRouter();
  const { data: cardLists, isLoading } = useQuery({
    queryKey: ["cardList"],
    queryFn: getMembersTimeline,
  });
  const handleClickCard = (id: string) => {
    router.push(router.route + "/detail/" + id);
  };
  console.log(isLoading);
  return (
    <ul className={cn("card-list")}>
      {cardLists === null ? (
        <div className={cn("card-nologin")}>
          <Image src={nologin} alt="로그인해주세요" width={79} height={79} />
          로그인 후 이용 가능합니다.
        </div>
      ) : isLoading ? (
        <div className={cn("loading")}>
          <CardSkel />
          <CardSkel />
          <CardSkel />
        </div>
      ) : (
        cardLists.map((item: any) => (
          <li key={item.binId} onClick={() => handleClickCard(item.binId)}>
            <Card admin={false} {...item} />
          </li>
        ))
      )}
    </ul>
  );
}
