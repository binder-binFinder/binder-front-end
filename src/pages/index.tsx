import HomeLayOut from "@/components/domains/home/HomeLayOut";
import Tutorial from "@/components/domains/home/Tutorial";
import OnBoardingSlide from "@/components/domains/onboarding/OnBoardingSlide";
import { onBoardingAtom, tutorialAtom } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useEffect } from "react";

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

export default function Home({
  isAddBin,
  isSearch = false,
}: {
  isAddBin: boolean;
  isSearch?: boolean;
}) {
  const [tutorial] = useAtom(tutorialAtom);
  const [onBoard] = useAtom(onBoardingAtom);

  useEffect(() => {
    document.body.style.overscrollBehaviorY = "none";
    return () => {
      document.body.style.overscrollBehaviorY = "auto";
    };
  }, []);

  return (
    <>
      {tutorial !== true && <Tutorial />}
      {onBoard !== true && <OnBoardingSlide />}
      <HomeLayOut isAddBin={isAddBin} isSearch={isSearch} />
    </>
  );
}
