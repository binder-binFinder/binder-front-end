import closeDark from "@/../public/images/dropClose-dark.svg";
import close from "@/../public/images/dropClose.svg";
import kakao from "@/../public/images/kakao.svg";
import { themeColor } from "@/lib/atoms/atom";
import classNames from "classnames/bind";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect } from "react";
import Portal from "../Portal";
import styles from "./Share.module.scss";

const cn = classNames.bind(styles);

interface IModalProps {
  modalClose: () => void;
  setShare: any;
}

export default function Share({ modalClose, setShare }: IModalProps) {
  const [theme] = useAtom(themeColor);
  const copyURL = () => {
    const currentUrl = "https://www.bin-finder.net/";
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setShare(true);
        modalClose();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleKakao = () => {
    const { Kakao, location } = window;
    if (Kakao) {
      Kakao.Link.sendDefault({
        objectType: "feed", // 피드 형식의 공유 템플릿
        content: {
          title: "Bin-finder", // 제목
          description: "가까운 쓰레기통 위치를 찾아보자", // 설명
          imageUrl: "https://www.bin-finder.net/images/logo-144.png", // 썸네일 이미지 URL
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
        buttons: [
          {
            title: "쓰레기통 찾으러 가기",
            link: {
              mobileWebUrl: location.href,
              webUrl: location.href,
            },
          },
        ],
      });
    }
  };
  return (
    <Portal>
      <div className={cn("shareBack")} data-cy="shareModal">
        <div className={cn("shareWrap")}>
          <div className={cn("shareTitle")}>Binder 공유하기</div>
          <div className={cn("shareClose")} onClick={modalClose}>
            <Image
              src={theme === "라이트 모드" ? close : closeDark}
              fill
              alt="닫기"
              sizes="35px"
            />
          </div>

          <div onClick={handleKakao}>
            <div className={cn("kakaoImg")}>
              <div>
                <Image src={kakao} alt="카카오 이미지" fill sizes="31px" />
              </div>
            </div>
            <div className={cn("kakaoText")}>카카오톡</div>
          </div>

          <div className={cn("shareOrigin")}>
            <input
              type="text"
              value={window.location.origin}
              data-cy="shareUrl"
            />
            <div onClick={copyURL} data-cy="shareBtn">
              URL복사
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
