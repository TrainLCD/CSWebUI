import { doc, runTransaction } from "@firebase/firestore";
import { getDownloadURL, ref } from "@firebase/storage";
import { getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { firestore, storage } from "../lib/firebase";
import { Report } from "../store/atoms/report";

const useReport = (ticketId?: string) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ticketId) {
      return;
    }
    const fetchData = async () => {
      const docRef = doc(firestore, "reports", ticketId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const r = docSnap.data() as Report;
        const screenShotUrl = await getDownloadURL(
          ref(storage, `reports/${ticketId}.png`)
        );
        setReport({ ...r, screenShotUrl });
      }

      setLoading(false);
    };
    fetchData();
  }, [ticketId]);

  const closeTicket = useCallback(
    async (reason: string) => {
      if (!report || !ticketId) {
        return;
      }
      const ticketRef = doc(firestore, "reports", ticketId);
      await runTransaction(firestore, async (transaction) => {
        const ticketDoc = await transaction.get(ticketRef);
        if (!ticketDoc.exists()) {
          console.error("[useReport closeTicket]Document does not exist!");
        }

        transaction.update(ticketRef, {
          resolved: true,
          resolvedReason: reason,
        });
      });
      setReport({ ...report, resolved: true, resolvedReason: reason });
    },
    [report, ticketId]
  );
  const reopenTicket = useCallback(async () => {
    if (!report || !ticketId) {
      return;
    }
    const ticketRef = doc(firestore, "reports", ticketId);
    await runTransaction(firestore, async (transaction) => {
      const ticketDoc = await transaction.get(ticketRef);
      if (!ticketDoc.exists()) {
        console.error("[useReport reopenTicket]Document does not exist!");
      }

      transaction.update(ticketRef, {
        resolved: false,
        resolvedReason: "",
      });
    });

    setReport({ ...report, resolved: false, resolvedReason: "" });
  }, [report, ticketId]);

  const closeTicketLazy = useCallback(
    async (report: Report, reason: string) => {
      const ticketRef = doc(firestore, "reports", report.id);
      await runTransaction(firestore, async (transaction) => {
        const ticketDoc = await transaction.get(ticketRef);
        if (!ticketDoc.exists()) {
          console.error("[useReport closeTicket]Document does not exist!");
        }

        transaction.update(ticketRef, {
          resolved: true,
          resolvedReason: reason,
        });
      });
      return { ...report, resolved: true, resolvedReason: reason };
    },
    []
  );
  const reopenTicketLazy = useCallback(async (report: Report) => {
    const ticketRef = doc(firestore, "reports", report.id);
    await runTransaction(firestore, async (transaction) => {
      const ticketDoc = await transaction.get(ticketRef);
      if (!ticketDoc.exists()) {
        console.error("[useReport reopenTicket]Document does not exist!");
      }

      transaction.update(ticketRef, {
        resolved: false,
        resolvedReason: "",
      });
    });

    return { ...report, resolved: false, resolvedReason: "" };
  }, []);

  return {
    report,
    loading,
    closeTicket,
    reopenTicket,
    closeTicketLazy,
    reopenTicketLazy,
  };
};

export default useReport;
