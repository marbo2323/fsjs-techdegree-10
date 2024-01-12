import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateCourse = ({ loadCourse }) => {
  const [course, setCourse] = useState();
  let courseTitle = useRef();
  let courseDescription = useRef();
  let estimatedTime = useRef();
  let materialsNeeded = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Update course");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      const courseData = await loadCourse(id);
      console.log(courseData);
      setCourse(courseData);
    })();
  }, []);
  if (course) {
    return (
      <div className="wrap">
        <h2>Update Course</h2>

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
