import Button from "@/components/commons/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button>
        <Link href={"/signin"}>signin</Link>
      </Button>
      <Button>
        <Link href={"/location"}>location</Link>
      </Button>
      <Button>
        <Link href={"/mypage"}>mypage</Link>
      </Button>
      <Button>
        <Link href={"/addbin"}>addbin</Link>
      </Button>
    </>
  );
}
