export const notiText = (item: string) => {
  switch (item) {
    case "BIN_REGISTRATION_REJECTED":
      return "등록 이(가) 거절 되었습니다.";
    case "BIN_REGISTRATION_APPROVED":
      return "등록 이(가) 승인 되었습니다.";
    case "BIN_MODIFICATION_APPROVED":
      return "수정 이(가) 승인 되었습니다.";
    case "BIN_MODIFICATION_REJECTED":
      return "수정 이(가) 거절 되었습니다.";
    case "BIN_COMPLAINT_APPROVED":
      return "신고 이(가) 승인 되었습니다.";
    case "BIN_COMPLAINT_REJECTED":
      return "신고 이(가) 거절 되었습니다.";
    case "BIN_LIKED":
      return "좋아요";
    case "BIN_DISLIKED":
      return "싫어요";
    default:
      break;
  }
};
