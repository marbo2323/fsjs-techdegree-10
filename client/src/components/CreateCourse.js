import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../utils/apiClient";
import UserContext from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

const CreateCourse = () => {
  // React hooks
  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();
  const navigate = useNavigate();
  const { authUser, credentials } = useContext(UserContext);

  // States
  const [errors, setErrors] = useState([]);

  // Event handlers
  // This function handles form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    // reset errors state
    setErrors([]);

    // when the user is logged in
    if (authUser) {
      // set values of raquired fields
      const courseData = {
        title: courseTitle.current.value,
        description: courseDescription.current.value,
        userId: authUser.id,
      };
      // set values of optional fields
      if (estimatedTime.current.value) {
        courseData.estimatedTime = estimatedTime.current.value;
      }
      if (materialsNeeded.current.value) {
        courseData.materialsNeeded = materialsNeeded.current.value;
      }

      try {
        const response = await createCourse(courseData, credentials);
        if (response.status === 201) {
          // navigate to the root path if the course was created successfully
          navigate("/");
        } else if (response.status === 400) {
          // read error data from response
          const errorMessage = await response.json();
          console.log(errorMessage);
          // set an error state to make errors to display to the user
          Array.isArray(errorMessage.message)
            ? setErrors(errorMessage.message)
            : setErrors([errorMessage.message]);
        } else {
          // if the response status is not 201 or 400, throw an error
          throw new Error(
            `An error occurred while creating the course. The response status is ${response.status}.`
          );
        }
      } catch (error) {
        // In case of an unexpected error, redirect to the /error route
        console.log(error.message);
        navigate("/error");
      }
    } else {
      // when the user is not logged in, redirect to /signin route
      navigate("/signin");
    }
  };

  // Handling the cancel button click
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              ref={courseTitle}
            />

            <p>By {authUser.firstName + " " + authUser.lastName}</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={courseDescription}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              ref={estimatedTime}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              ref={materialsNeeded}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
