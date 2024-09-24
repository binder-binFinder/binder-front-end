export const MODAL_CONTENTS: Record<string, ModalContent> = {
  rejectFix: {
    title: "수정 거절 처리",
    text: "쓰레기통 정보수정을 거절하였습니다.",
    ismore: true,
    status: "red",
  },
  rejectAdd: {
    title: "등록 거절 처리",
    text: "쓰레기통 등록을 거절하였습니다.",
    ismore: true,
    status: "red",
  },
  SuccessReport: {
    title: "신고 승인",
    text: "신고받은 장소를 삭제하였습니다.",
    ismore: true,
    status: "red",
  },
  editbin: {
    title: "쓰레기통 정보 수정",
    text: "쓰레기통 정보를 수정하였습니다.",
    ismore: true,
    status: "red",
  },
  reportComplaint: {
    title: "쓰레기통 신고 완료",
    text: "서비스 이용에 불편을 드려 죄송합니다.신고는 검토 후 처리됩니다.",
    ismore: true,
    status: "red",
  },

  rejectReport: {
    title: "신고 거절",
    text: "쓰레기통 신고 건을 거절하였습니다.",
    ismore: true,
    status: "basic",
  },
  requestAddBin: {
    title: "쓰레기통 등록 신청",
    text: "쓰레기통이 등록 신청되었습니다. 심사결과까지 대략 3일이 소요됩니다.",
    ismore: false,
    status: "basic",
  },
  requestFixBin: {
    title: "쓰레기통 정보 수정 요청",
    text: "관리자에게 쓰레기통 정보 수정을 요청했습니다.",
    ismore: true,
    status: "basic",
  },
  processingCompleted: {
    title: "처리 완료",
    text: "다른 관리자에 의해 이미 처리되었습니다.",
    ismore: false,
    status: "basic",
  },
  approveAdd: {
    title: "등록 승인 처리",
    text: "쓰레기통 등록을 승인하였습니다.",
    ismore: false,
    status: "green",
  },
  approveFix: {
    title: "수정 승인 처리",
    text: "쓰레기통 정보 수정을 승인하였습니다.",
    ismore: false,
    status: "green",
  },
};

export interface ModalContent {
  title: string;
  text: string;
  ismore: boolean;
  status: "green" | "red" | "basic";
}
