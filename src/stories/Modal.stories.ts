import Modal from "@/components/commons/Modal/TrashHow";

export default {
  title: "Test/Modal",
  component: Modal,
};

export const A = {
  args: {
    modalState: "거절",
  },
};
export const B = {
  args: {
    modalState: "승인",
  },
};
export const C = {
  args: {
    modalState: "심사 중",
  },
};
