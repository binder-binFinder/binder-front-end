import Image from "next/image";
import styles from "./SocialoginButton.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

interface Props {
  onClick: () => void;
  label: "kakao" | "naver" | "google";
  testId: "kakaoBtn" | "naverBtn" | "googleBtn";
}

const links = {
  kakao: "카카오",
  naver: "네이버",
  google: "구글",
};

const logos = {
  kakao: { src: "/images/icon-kakao-logo.svg", alt: "카카오톡 로고" },
  naver: { src: "/images/icon-naver-logo.svg", alt: "네이버 로고" },
  google: { src: "/images/icon-google-logo.svg", alt: "구글 로고" },
};

export default function SocialoginButton({ onClick, label, testId }: Props) {
  return (
    <button onClick={onClick} type="button" className={cn("btn", label)} data-cy={testId}>
      <Image src={logos[label].src} alt={logos[label].alt} width={16} height={16} />
      <p className={cn("btn-text")}>{links[label]}로 로그인</p>
    </button>
  );
}
