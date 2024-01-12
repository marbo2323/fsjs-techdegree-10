import { createContext, useState } from "react";
import { signIn } from "../utils/apiClient";
const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);

  const signInUser = async (credentials) => {
    const response = await signIn("/users", credentials);

    if (response.status === 200) {
      const user = await response.json();
      setAuthUser(user);
      return user;
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error("Sign-in failed");
    }
  };

  const signOutUser = () => {
    setAuthUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        authUser,
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
