import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ValidationErrors from "./ValidationErrors";
import { createUser } from "../utils/apiClient";
import UserContext from "../context/UserContext";

const UserSignUp = () => {
  // React hooks
  const firstName = useRef();
  const lastName = useRef();
  const emailAddress = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { actions } = useContext(UserContext);

  // state
  const [errors, setErrors] = useState([]);

  // Event handlers

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset validation errors
    setErrors([]);
    const userData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    try {
      const response = await createUser(userData);
      if (response.status === 201) {
        // if server responds with a 201 status, login user
        const credentials = {
          emailAddress: emailAddress.current.value,
          password: password.current.value,
        };
        await actions.signInUser(credentials);
        navigate("/");
      } else if (response.status === 400) {
        // show validation errors to the user
        const errorData = await response.json();
        Array.isArray(errorData.message)
          ? setErrors(errorData.message)
          : setErrors([errorData.message]);
      } else {
        // if the response status is not 201 or 400, throw an error
        throw new Error(
          `An error occurred while creating the user. The response status is ${response.status}.`
        );
      }
    } catch (error) {
      // In case of an unexpected error, redirect to the /error route
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
      <h2>Sign Up</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstName} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastName} />
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
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to{" "}
        <Link to="/signin">sign in</Link>!
      </p>
    </div>
  );
};

export default UserSignUp;
