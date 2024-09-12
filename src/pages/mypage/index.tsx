import MyPageNologin from "@/components/domains/mypage/MyPageNologin";
import MyPageProfile from "@/components/domains/mypage/MyPageProfile";
import MyPageToggle from "@/components/domains/mypage/MyPageToggle";
import { getMembers } from "@/lib/apis/members";
import { adminUser, loginState } from "@/lib/atoms/userAtom";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function MyPage() {
  const { data: memberData } = useQuery({
    queryKey: ["memberDatas"],
    queryFn: () => getMembers(),
  });

  const [, setLoginState] = useAtom(loginState);
  const [, setIsAdmin] = useAtom(adminUser);

  useEffect(() => {
    if (memberData !== null) {
      setLoginState(true);
      setIsAdmin(memberData?.role);
    } else {
      setLoginState(false);
    }
  }, [setLoginState, setIsAdmin, memberData]);

  return !!memberData ? (
    <>
      <MyPageProfile memberData={memberData} />
      <MyPageToggle />
    </>
  ) : (
    <>
      <MyPageNologin />
      <MyPageToggle />
    </>
  );
}
