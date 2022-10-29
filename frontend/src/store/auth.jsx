import { createContext, useState, useEffect } from "react";

const AuthenticationContext = createContext();

const { Provider } = AuthenticationContext;

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const expiresAt = localStorage.getItem("expiresAt");

  if (token && userInfo && expiresAt) {
    return { token, expiresAt, userInfo };
  } else {
    return {};
  }
};

const AuthenticationProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => getInitialState());

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    const expiresAt = localStorage.getItem("expiresAt");

    setAuthState({
      token,
      expiresAt,
      userInfo: userInfo ? JSON.parse(userInfo) : {},
    });
  }, []);

  const setAuthenticationInfo = ({ token, expiresAt, userInfo }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);

    setAuthState({ token, expiresAt, userInfo: userInfo ? userInfo : {} });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("expiresAt");

    setAuthState({});
  };

  const isAuthenticated = () => {
    if (!authState.token || !authState.expiresAt) {
      return false;
    }

    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  return (
    <Provider
      value={{
        authState,
        logout,
        isAuthenticated,
        setAuthState: (authInfo) => setAuthenticationInfo(authInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthenticationContext, AuthenticationProvider };
