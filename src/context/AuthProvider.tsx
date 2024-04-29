import { FC, PropsWithChildren, createContext } from "react";
import { useAppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { setAuth } from "../store/features/auth/AuthSlice";

export const AuthContext = createContext({
  logout: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setAuth(false));
    navigate.push("/signin");
  }
  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  )
};
