import Button from "@/components/commons/Button.tsx";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/signin"}>signin</Link>
      <Button>일반 쓰레기통</Button>
      <Button>의류 수거함</Button>
      <Button>재활용 쓰레기통</Button>
      <Button status="primary">등록</Button>
      <Button status="alert">등록</Button>
    </>
  );
}
