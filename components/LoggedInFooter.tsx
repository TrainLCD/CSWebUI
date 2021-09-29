import { signOut } from "@firebase/auth";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { auth } from "../lib/firebase";
import authState from "../store/atoms/auth";

const Footer = styled.footer``;
const LoggedInUser = styled.p``;
const LogoutLink = styled.p``;

const LoggedInFooter = () => {
  const authStateValue = useRecoilValue(authState);
  const handleSignOut = () => signOut(auth);

  return (
    <Footer>
      <LoggedInUser>
        {authStateValue.currentUser?.email}でログイン中
      </LoggedInUser>
      <LogoutLink onClick={handleSignOut}>ログアウト</LogoutLink>
    </Footer>
  );
};

export default LoggedInFooter;
