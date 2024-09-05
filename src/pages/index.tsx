import Button from "@/components/commons/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Button>
        <Link href={"/signin"}>signin</Link>
      </Button>
    </>
  );
}
