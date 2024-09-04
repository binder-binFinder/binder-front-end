import { useQuery } from "@tanstack/react-query";
import Card from "../Card";
import styles from "./CardList.module.scss";
import classNames from "classnames/bind";
import { getMembersTimeline } from "@/lib/apis/members";

const cn = classNames.bind(styles);

export type Status = "REJECTED" | "APPROVED" | "PENDING";
export interface CardProps {
  id: number;
  title: string;
  address: string;
  type: string;
  status: string;
  createdAt: string;
  bookmarkCount: number;
  isAdmin?: boolean;
  admin: boolean;
}

// const mook = [
//   {
//     id: 0,
//     title: "타이틀",
//     address: "주소주소",
//     type: "GENERAL",
//     status: "PENDING",
//     createdAt: "2024-09-04T12:15:24.724Z",
//     bookmarkCount: 23,
//   },
// ];

export default function CardList() {
  const { data: cardLists } = useQuery({
    queryKey: ["cardList"],
    queryFn: getMembersTimeline,
  });
  return (
    <ul className={cn("card-list")}>
      {cardLists?.map((item: any) => (
        <li key={item.id}>
          <Card admin={false} {...item} />
        </li>
      ))}
    </ul>
  );
}
