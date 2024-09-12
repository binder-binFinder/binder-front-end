import MyPageNologin from "@/components/domains/mypage/MyPageNologin";
import MyPageProfile from "@/components/domains/mypage/MyPageProfile";
import MyPageToggle from "@/components/domains/mypage/MyPageToggle";
import { getMembers } from "@/lib/apis/members";
import { adminUser, loginState } from "@/lib/atoms/userAtom";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";

let isLoginState = false;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { req } = context;

  const cookies = req.headers.cookie || "";

  await queryClient.prefetchQuery({
    queryKey: ["memberDatas", isLoginState],
    queryFn: () => getMembers(cookies), // 쿠키를 전달하여 API 호출
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient), // 상태를 직렬화하여 클라이언트에 전달
    },
  };
};

export default function MyPage({
  dehydratedState,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const memberData = dehydratedState.queries[0].state.data;
  const [isLogin, setLoginState] = useAtom(loginState);
  const [, setIsAdmin] = useAtom(adminUser);

  useEffect(() => {
    if (memberData !== null) {
      setLoginState(true);
      isLoginState = true;
      setIsAdmin(memberData.role);
    } else {
      setLoginState(false);
      isLoginState = false;
    }
  }, [memberData, setLoginState, setIsAdmin, isLoginState]);

  return isLogin && memberData !== null ? (
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
