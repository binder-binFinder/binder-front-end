import classNames from "classnames/bind";
import Portal from "../Portal";
import styles from "./Share.module.scss";
import { useRouter } from "next/router";
import kakao from "@/../public/images/kakao.svg";
import Image from "next/image";
import { useEffect } from "react";

const cn = classNames.bind(styles);

interface IModalProps {
  modalClose: () => void;
}

export default function Share({ modalClose }: IModalProps) {
  const router = useRouter();

  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand("copy");
    document.body.removeChild(t);
  };

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  const handleKakao = () => {
    const { Kakao, location } = window;
    if (Kakao) {
      Kakao.Link.sendScrap({
        requestUrl: location.href,
      });
    }
  };
  return (
    <Portal>
      <div className={cn("shareBack")}>
        <div className={cn("shareWrap")}>
          <div className={cn("shareTitle")}>Binder 공유하기</div>
          {/* <div onClick={modalClose}>close</div> */}

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
