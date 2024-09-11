import Button from "@/components/commons/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/signin"}>
        <Button>signin</Button>
      </Link>
      <Link href={"/location"}>
        <Button>location</Button>
      </Link>
      <Link href={"/mypage"}>
        <Button>mypage</Button>
      </Link>
      <Link href={"/addbin"}>
        <Button>addbin</Button>
      </Link>
      <Link href={"/KakaoMap"}>
        <Button>kakaomap</Button>
      </Link>
    </>
  );
}
