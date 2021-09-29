import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "../lib/firebase";
import authState, { CustomCurrentUser } from "../store/atoms/auth";

const useRestrict = (): boolean => {
  const setAuthState = useSetRecoilState(authState);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setAuthState((prev) => ({
          ...prev,
          currentUser: currentUser.toJSON() as CustomCurrentUser,
        }));
        setLoggedIn(true);
      } else {
        router.push("/login");
      }
    });
  }, [router, setAuthState]);

  return loggedIn;
};

export default useRestrict;
