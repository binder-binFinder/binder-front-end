import SigninButton from "@/components/domain/signin/SigninButton";

export default function SignIn() {
  const handleClickKakaoSignIn = () => {
    window.location.href = "";
  };

  const handleClickNaverSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/naver";
  };
  const handleClickGoogleSignIn = () => {
    window.location.href = "https://api.bin-finder.net/oauth2/authorization/google";
  };
  return (
    <>
      <SigninButton label="kakao" onClick={handleClickKakaoSignIn} />
      <SigninButton label="naver" onClick={handleClickNaverSignIn} />
      <SigninButton label="google" onClick={handleClickGoogleSignIn} />
    </>
  );
}
