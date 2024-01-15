import { createContext, useState } from "react";
import { signIn } from "../utils/apiClient";
const UserContext = createContext(null);

export const UserProvider = (props) => {
  const getStorageItem = (key) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };

  const [authUser, setAuthUser] = useState(getStorageItem("authUser"));
  const [credentials, setCredentials] = useState(getStorageItem("credentials"));

  const signInUser = async (credentials) => {
    const response = await signIn(credentials);

    if (response.status === 200) {
      const user = await response.json();
      setAuthUser(user);
      setCredentials(credentials);
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("credentials", JSON.stringify(credentials));
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error("Sign-in failed");
    }
  };

  const signOutUser = () => {
    setAuthUser(null);
    setCredentials(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
        credentials,
        actions: {
          signInUser,
          signOutUser,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
