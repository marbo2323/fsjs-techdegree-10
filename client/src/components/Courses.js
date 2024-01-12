import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Courses = ({ loadCourses }) => {
  console.log("Courses");
  const [courses, setCourses] = useState();

  useEffect(() => {
    (async () => {
      const data = await loadCourses();
      setCourses(data);
    })();
  }, []);

  return (
    <div className="wrap main--grid">
      {courses
        ? courses.map((course) => {
            return (
              <Link
                className="course--module course--link"
                to={"/courses/" + course.id}
                key={course.id}
              >
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            );
          })
        : null}
      <Link className="course--module course--add--module" to="/courses/create">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default Courses;
