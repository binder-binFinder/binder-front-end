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
    if (memberData === null || memberData === undefined) {
      setLoginState(false);
    } else {
      setLoginState(true);
      setIsAdmin(memberData?.role);
    
    }
  }, [setLoginState, setIsAdmin, memberData]);

  return !!memberData ? (
    <section data-cy="login">
      <MyPageProfile memberData={memberData} />
      <MyPageToggle />
    </section>
  ) : (
    <section data-cy="noLogin">
      <MyPageNologin />
      <MyPageToggle />
    </section>
  );
}
