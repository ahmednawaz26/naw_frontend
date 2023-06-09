import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setToken = (token) => {
    _setToken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const value = { user, token, setUser, setToken };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
