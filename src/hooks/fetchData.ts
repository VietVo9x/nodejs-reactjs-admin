import { useContext, useEffect, useState } from "react";
import { getData } from "../apis/api.service";
import { _VERIFY_TOKEN } from "../apis";
import { I_IsLoginContext, IsLoginContext } from "../Context/login.context";

export const useFetchData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const { isLogin, setIsLogin, user, setUser }: I_IsLoginContext = useContext(IsLoginContext);

  useEffect(() => {
    // getData(_VERIFY_TOKEN)
    //   .then((res) => {
    //     if (res) {
    //       setUser(res.data);
    //       setIsLogin(true);
    //     }
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 1000);
    //     setError(err);
    //   });
  }, []);

  return {
    loading,
    error,
    user,
    isLogin,
  };
};
