import Card from "../Card";
import styles from "./CardList.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export interface CardProps {
  name: string;
  address: string;
  createdAt: string;
  isAdmin: boolean;
  admin?: string;
  status: "reject" | "approve" | "judge";
  likes?: {
    count: number;
    mylike: boolean;
  };
  id: number;
}

export default function CardList() {
  return (
    <ul className={cn("card-list")}>
      {mook.map((item) => (
        <li key={item.id}>
          <Card {...item} />
        </li>
      ))}
    </ul>
  );
}

const mook = [
  {
    name: "용산공원정문",
    address: "서울특별시 용산구 1-1",
    createdAt: "2024.09.01",
    isAdmin: false,
    status: "reject",
    likes: { count: 3, mylike: false },
    id: 1,
  },

  {
    name: "용산공원정222",
    address: "서울특별시 용산구 1-1333333",
    createdAt: "2024.09.01",
    isAdmin: true,
    admin: "박지원",
    status: "approve",
    // likes: { count: 3, mylike: true },
    id: 2,
  },
  {
    name: "자유공원정문",
    address: "서울특별시 용산구 1-1333333",
    createdAt: "2024.09.01",
    isAdmin: true,
    admin: "박지원",
    status: "judge",
    id: 3,
  },
];
