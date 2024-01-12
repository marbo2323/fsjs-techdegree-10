import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const UserSignOut = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  actions.signOutUser();
  navigate("/");
};
export default UserSignOut;
