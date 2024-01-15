import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../utils/apiClient";
import UserContext from "../context/UserContext";
import ValidationErrors from "./ValidationErrors";

const CreateCourse = () => {
  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();
  const navigate = useNavigate();
  const { authUser, credentials } = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    if (authUser) {
      const courseData = {
        title: courseTitle.current.value,
        description: courseDescription.current.value,
        userId: authUser.id,
      };
      if (estimatedTime.current.value) {
        courseData.estimatedTime = estimatedTime.current.value;
      }
      if (materialsNeeded.current.value) {
        courseData.materialsNeeded = materialsNeeded.current.value;
      }

      try {
        const response = await createCourse(courseData, credentials);
        if (response.status === 201) {
          navigate("/");
        } else if (response.status === 400) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          Array.isArray(errorMessage.message)
            ? setErrors(errorMessage.message)
            : setErrors([errorMessage.message]);
        } else {
          throw new Error(
            `An error occurred while creating the course. The response status is ${response.status}.`
          );
        }
      } catch (error) {
        console.log(error.message);
        navigate("/error");
      }
    } else {
      navigate("/signin");
    }
  };

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
