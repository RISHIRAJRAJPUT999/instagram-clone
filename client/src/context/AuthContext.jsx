import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        axios.defaults.headers.common["x-auth-token"] = token;
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    
    setIsAppReady(true);
  }, []);

  const login = (authToken, details) => {
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(details));
    
    axios.defaults.headers.common["x-auth-token"] = authToken;
    setUser(details);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    delete axios.defaults.headers.common["x-auth-token"];
    setUser(null);
  };

  const contextValue = {
    user,
    login,
    logout,
    loading: !isAppReady,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isAppReady ? children : null}
    </AuthContext.Provider>
  );
};