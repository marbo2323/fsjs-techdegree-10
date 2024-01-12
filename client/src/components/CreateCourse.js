import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const courseTitle = useRef();
  const courseDescription = useRef();
  const estimatedTime = useRef();
  const materialsNeeded = useRef();
  const navigate = useNavigate();

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <>
      <h2>Create Course</h2>

      <form>
        <div className="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value=""
              ref={courseTitle}
            />

            <p>By Joe Smith</p>

            <label for="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={courseDescription}
            ></textarea>
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value=""
              ref={estimatedTime}
            />

            <label for="materialsNeeded">Materials Needed</label>
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
    </>
  );
};

export default CreateCourse;
