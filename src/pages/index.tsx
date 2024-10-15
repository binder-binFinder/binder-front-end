import HomeLayOut from "@/components/domains/home/HomeLayOut";
import Tutorial from "@/components/domains/home/Tutorial";
import OnBoardingSlide from "@/components/domains/onboarding/OnBoardingSlide";
import { onBoardingAtom, tutorialAtom } from "@/lib/atoms/atom";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home({ isSearch = false }: { isSearch?: boolean }) {
  const router = useRouter();
  const { addBin } = router.query;
  const [tutorial] = useAtom(tutorialAtom);
  const [onBoard] = useAtom(onBoardingAtom);

  useEffect(() => {
    document.body.style.overscrollBehaviorY = "none";
    return () => {
      document.body.style.overscrollBehaviorY = "auto";
    };
  }, []);

  if (!!addBin) {
    return (
      <>
        {tutorial !== true && <Tutorial />}
        {onBoard !== true && <OnBoardingSlide />}
        <HomeLayOut isAddBin={false} isSearch={isSearch} />
      </>
    );
  }

  return <HomeLayOut isAddBin={addBin === "true"} isSearch={isSearch} />;

}
