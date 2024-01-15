import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../utils/apiClient";
import UserContext from "../context/UserContext";
import { updateCourse } from "../utils/apiClient";
import ValidationErrors from "./ValidationErrors";

const UpdateCourse = () => {
  // React hooks
  const [course, setCourse] = useState();
  let courseTitle = useRef();
  let courseDescription = useRef();
  let estimatedTime = useRef();
  let materialsNeeded = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const { authUser, credentials } = useContext(UserContext);

  // State
  const [errors, setErrors] = useState([]);

  // event handlers

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error state
    setErrors([]);

    // enable update action to the authenticated user only
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
        const response = await updateCourse(id, courseData, credentials);
        if (response.status === 204) {
          // if action is successful redirect to the course's detail page
          navigate("/courses/" + id);
        } else if (response.status === 400) {
          // display validation errors to user
          const errorMessage = await response.json();
          console.log(errorMessage);
          Array.isArray(errorMessage.message)
            ? setErrors(errorMessage.message)
            : setErrors([errorMessage.message]);
        } else {
          // if the response status is not 204 or 400, throw an error
          throw new Error(
            `An error occurred while updating the course. The response status is ${response.status}.`
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
    navigate("/courses/" + id);
  };

  // Fetch course data from API using async IIFE (see: https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
  useEffect(() => {
    (async () => {
      const response = await getCourseById(id);
      if (response.status === 200) {
        const courseData = await response.json();
        // Fetch course inly for course owner
        if (courseData.userId === authUser.id) {
          setCourse(courseData);
        } else {
          // if authenticated user is not the owner, redirect to /forbidden route
          navigate("/forbidden");
        }
      } else if (response.status === 404) {
        // if the server responds with a 400 status, redirect to the /notfound route
        navigate("/notfound");
      }
    })();
  }, [id, navigate, authUser.id]);
  if (course) {
    return (
      <div className="wrap">
        <h2>Update Course</h2>
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
                defaultValue={course.title}
              />

              <p>
                By {course.user.firstName} {course.user.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={courseDescription}
                defaultValue={course.description}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTime}
                defaultValue={course.estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeeded}
                defaultValue={
                  course.materialsNeeded
                    ? course.materialsNeeded.replace("*", "")
                    : null
                }
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="wrap">
        <h2>Update Course</h2>
        <p>Loading...</p>
      </div>
    );
  }
};

export default UpdateCourse;
