import { Timestamp } from "@firebase/firestore";
import { atom } from "recoil";
import RecoilAtomKeys from "../../constants/recoil";

export type Report = {
  id: string;
  createdAt: Timestamp;
  description: string;
  resolved: boolean;
  resolvedReason: string;
  updatedAt: Timestamp;
};

type ReportAtomState = {
  reports: Report[];
};

const reportState = atom<ReportAtomState>({
  key: RecoilAtomKeys.Report,
  default: {
    reports: [],
  },
});

export default reportState;
