import { collection, getDocs, query, where } from "@firebase/firestore";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { firestore } from "../lib/firebase";
import reportState, { Report } from "../store/atoms/report";

const useDispatchReports = (withResolved?: boolean) => {
  const setReportState = useSetRecoilState(reportState);
  const fetchReportsAndSetStateAsync = useCallback(async () => {
    if (withResolved) {
      const snapshot = await getDocs(collection(firestore, "reports"));
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Report[];
      setReportState((prev) => ({ ...prev, reports: docs }));
      return;
    }
    const snapshot = await getDocs(
      query(collection(firestore, "reports"), where("resolved", "==", false))
    );
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Report[];
    setReportState((prev) => ({ ...prev, reports: docs }));
  }, [setReportState, withResolved]);

  useEffect(() => {
    fetchReportsAndSetStateAsync();
  }, [fetchReportsAndSetStateAsync]);

  return {
    refetchReports: fetchReportsAndSetStateAsync,
  };
};

export default useDispatchReports;
