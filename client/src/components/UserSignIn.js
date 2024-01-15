import { useRef, useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

const UserSignIn = () => {
  // React hooks
  const emailAddress = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);
  const location = useLocation();

  // State
  const [errors, setErrors] = useState([]);

  // Event handlers

  // Handle form submit
  const handleSubmit = async (event) => {
    // prevent form submit default behaviour
    event.preventDefault();
    // Reset errors
    setErrors([]);
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    // setting the redirect location based on the user's original location
    let from = "/";
    if (location.state) {
      from = location.state.from;
    }

    try {
      const user = await actions.signInUser(credentials);
      if (user) {
        navigate(from);
      } else {
        setErrors(["Sign-in Failed!"]);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  // Handling the cancel button click
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <ValidationErrors errors={errors} />
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
