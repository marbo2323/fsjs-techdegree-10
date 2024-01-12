import { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  const emailAddress = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    let errors = [];
    try {
      const user = await actions.signInUser(credentials);
      if (user) {
        navigate("/");
      } else {
        errors = ["Sign-in Feiled!"];
      }
    } catch (error) {
      console.log(error);
      errors = ["Sign-in Feiled!"];
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          ref={emailAddress}
        />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} />
        <button className="button" type="submit">
          Sign In
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
