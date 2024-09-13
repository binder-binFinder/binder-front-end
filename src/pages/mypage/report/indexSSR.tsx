// import AdminPage from "@/components/domains/mypage/Admin/AdminPage";
// import { getAdminBinsReport } from "@/lib/apis/report";
// import { QueryClient, dehydrate } from "@tanstack/react-query";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import { createContext, useContext } from "react";

// // GetServerSideProps에서 context를 사용해 쿼리 파라미터 받기
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const queryClient = new QueryClient();
//   const { req } = context;

//   // 쿠키 값 가져오기
//   const cookies = req.headers.cookie || "";

//   // 쿼리 파라미터에서 pageFilter 값 가져오기
//   const { filter } = context.query;

//   const filterValue = filter || "전체"; // 기본값을 "전체"로 설정

//   // prefetchQuery로 데이터를 미리 가져옴
//   await queryClient.prefetchQuery({
//     queryKey: ["memberDatas", filterValue], // queryKey에 필터 값을 포함
//     queryFn: () => getAdminBinsReport(filterValue, cookies), // 필터 값과 쿠키를 API에 전달
//   });

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
// const reportPageContext = createContext<any>([]);
// export const useReportPageContext = () => useContext(reportPageContext);
// export default function Report({
//   dehydratedState,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
//   return (
//     <reportPageContext.Provider value={dehydratedState}>
//       <AdminPage title={"신고받은 쓰레기통"} />
//     </reportPageContext.Provider>
//   );
// }
