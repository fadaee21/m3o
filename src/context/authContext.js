import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({ loggedIn: false });

  const toggle = () => {
    setUserAuth((prev) => ({ ...prev, loggedIn: !prev.loggedIn }));
  };

  return (
    <AuthContext.Provider value={{ userAuth, toggle }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === "undefined") throw new Error(" context can not be undefined");
  return context;
};

export { AuthProvider, useAuth };
