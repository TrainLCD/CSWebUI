import { atom } from "recoil";
import RecoilAtomKeys from "../../constants/recoil";

export type CustomCurrentUser = {
  email: string;
};

type AuthAtomState = {
  currentUser: CustomCurrentUser | null;
};

const authState = atom<AuthAtomState>({
  key: RecoilAtomKeys.Auth,
  default: {
    currentUser: null,
  },
});

export default authState;
