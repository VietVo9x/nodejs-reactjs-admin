import { createContext, Dispatch, SetStateAction, ReactNode, useState } from "react";
import { User_Res } from "../types/reponse.type";
export interface I_IsLoginContext {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  user: User_Res | undefined;
  setUser: Dispatch<SetStateAction<User_Res | undefined>>;
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
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useState<User_Res | undefined>(undefined);
  return (
    <IsLoginContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </IsLoginContext.Provider>
  );
};

export default IsLoginProvider;
