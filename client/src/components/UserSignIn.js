import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = () => {
  const emailAddress = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label for="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value=""
          ref={emailAddress}
        />
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value=""
          ref={password}
        />
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
