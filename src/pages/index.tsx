import KakaoMap from "@/components/domains/home/KakaoMap";
import styles from "@/components/domains/home/KakaoMap/KakaoMap.module.scss";
import BtnField from "@/components/domains/home/KakaoMap/SearchBtn";
import Tutorial from "@/components/domains/home/Tutorial";
import { tutorialAtom } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const cn = classNames.bind(styles);
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const isAddBin = query.addBin === "true";

  return {
    props: {
      isAddBin,
    },
  };
};

export default function Home({ isAddBin }: { isAddBin: boolean }) {
  const [tutorial] = useAtom(tutorialAtom);
  return (
    <>
      {tutorial !== true && <Tutorial />}
      <section className={cn("map-wrapper")}>
        <BtnField isAddBin={isAddBin} />
        <KakaoMap isAddBin={isAddBin} />
      </section>
    </>
  );
}
