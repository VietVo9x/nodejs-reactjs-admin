import { createContext, Dispatch, SetStateAction, ReactNode, useState } from "react";
import { Res_UserInfoLogin } from "../types/reponse.type";
export interface I_IsLoginContext {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  user: Res_UserInfoLogin | undefined;
  setUser: Dispatch<SetStateAction<Res_UserInfoLogin | undefined>>;
}
const defaultState: I_IsLoginContext = {
  isLogin: false,
  setIsLogin: () => {},
  user: undefined,
  setUser: () => {},
};
export const IsLoginContext = createContext<I_IsLoginContext>(defaultState);

interface IsLoginProviderProps {
  children: ReactNode;
}

const IsLoginProvider = ({ children }: IsLoginProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<Res_UserInfoLogin | undefined>(undefined);
  return (
    <IsLoginContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginProvider;
