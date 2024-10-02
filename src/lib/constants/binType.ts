export const binType = (item: string) => {
  switch (item) {
    case "GENERAL":
      return "일반 쓰레기통";
    case "RECYCLE":
      return "분리수거함";
    case "BEVERAGE":
      return "음료 쓰레기통";
    case "CIGAR":
      return "담배꽁초 수거함";
    default:
      return "일반 쓰레기통";
  }
};
