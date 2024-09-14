import { atomWithStorage } from "jotai/utils";

export const binDetail = atomWithStorage<BinDetail>("bindata", {
  binId: 0,
  title: "",
  address: "",
  nickname: "",
  type: "GENERAL",
  status: "PENDING",
  createdAt: "",
});

export interface BinDetail {
  binId?: number;
  id?: number;
  title: string;
  address: string;
  nickname: string;
  type: "GENERAL" | "RECYCLE" | "CIGAR" | "BEVERAGE";
  status: "PENDING" | "APPROVED" | "REJECTED";
  imageUrl?: string;
  createdAt: string;

  registrationId?: number;

  modificationId?: number;
  latitude?: number;
  longitude?: number;
  modificationReason?: string;

  complaintId?: number;
  mostRecentComplaintAt?: string;
  complaintCount?: number;
  binInfoForMember?: {
    isOwner: true;
    isLiked: false;
    isDisliked: false;
    isBookMarked: false;
  };
}
