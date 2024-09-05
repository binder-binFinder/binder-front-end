import MyPageNologin from "@/components/domains/mypage/MyPageNologin";
import MyPageProfile from "@/components/domains/mypage/MyPageProfile";
import MyPageToggle from "@/components/domains/mypage/MyPageToggle";
import { getMembers } from "@/lib/apis/members";
import { loginState } from "@/lib/atoms/userAtom";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { useAtom } from "jotai";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { req } = context;
  const cookies = req.headers.cookie || "";

  await queryClient.prefetchQuery({
    queryKey: ["memberDatas"],
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
  const [, setLoginState] = useAtom(loginState);

  useEffect(() => {
    if (memberData !== null) {
      setLoginState(true);
    }
  }, [memberData, setLoginState]);
  return memberData !== null ? (
    <>
      {/* <HydrationBoundary state={dehydratedState}> */}
      <MyPageProfile memberData={memberData} />
      <MyPageToggle />
      {/* </HydrationBoundary> */}
    </>
  ) : (
    <>
      <MyPageNologin />
      <MyPageToggle />
    </>
  );
}
