import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handle Create Course");
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>

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

            <p>By Signed in user</p>

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