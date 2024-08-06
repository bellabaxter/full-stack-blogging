import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("https://full-stack-blogging-backend.onrender.com/api/signup/login", inputs,{withCredentials: true});
      //const res = await axios.post("http://localhost:8000/api/signup/login", inputs,{withCredentials: true});

      const { token, ...userData } = res.data;

      // localStorage.setItem("authToken", token);
      // localStorage.setItem("user", JSON.stringify(res.data));
      // setCurrentUser(userData);

      setAuthToken(res.data.token);
      setCurrentUser(res.data.other);

    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("https://full-stack-blogging-backend.onrender.com/api/signup/logout", null, {withCredentials: true});
      //await axios.post("http://localhost:8000/api/signup/logout", null, {withCredentials: true});
      // localStorage.removeItem("user");
      // localStorage.removeItem("authToken");
      //setCurrentUser(null);

      setAuthToken(null);
      setCurrentUser(null);

    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
