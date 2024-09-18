import close from "@/../public/images/dropClose.svg";
import kakao from "@/../public/images/kakao.svg";
import classNames from "classnames/bind";
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
  const copyURL = () => {
    let currentUrl = "https://www.bin-finder.net/";
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
    modalClose();
    setShare(true);
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
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
          imageUrl:
            "https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/05/urban-20230530170006446243.jpg", // 썸네일 이미지 URL
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
      <div className={cn("shareBack")}>
        <div className={cn("shareWrap")}>
          <div className={cn("shareTitle")}>Binder 공유하기</div>
          <div className={cn("shareClose")} onClick={modalClose}>
            <Image src={close} fill alt="닫기" sizes="35px" />
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
            <input type="text" value={window.location.origin} />
            <div onClick={copyURL}>URL복사</div>
          </div>
        </div>
      </div>
    </Portal>
  );
}
