import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "../utils/apiClient";
import UserContext from "../context/UserContext";
import { updateCourse } from "../utils/apiClient";
import ValidationErrors from "./ValidationErrors";

const UpdateCourse = () => {
  const [course, setCourse] = useState();
  let courseTitle = useRef();
  let courseDescription = useRef();
  let estimatedTime = useRef();
  let materialsNeeded = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
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
        const response = await updateCourse(id, courseData, credentials);
        if (response.status === 204) {
          navigate("/courses/" + id);
        } else if (response.status === 400) {
          // display validation errors to user
          const errorMessage = await response.json();
          console.log(errorMessage);
          Array.isArray(errorMessage.message)
            ? setErrors(errorMessage.message)
            : setErrors([errorMessage.message]);
        } else {
          throw new Error(
            `An error occurred while updating the course. The response status is ${response.status}.`
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
    navigate("/courses/" + id);
  };

  useEffect(() => {
    (async () => {
      const response = await getCourseById(id);
      if (response.status === 200) {
        const courseData = await response.json();
        if (courseData.userId === authUser.id) {
          setCourse(courseData);
        } else {
          navigate("/forbidden");
        }
      } else if (response.status === 404) {
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
