import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: null,
    organization: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    console.log("authdata",data)
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        username: parseData.username,
        organization: parseData.organization,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
