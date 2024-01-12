import { Link } from "react-router-dom";

const Courses = ({ courses }) => {
  console.log("Courses");

  return (
    <div className="wrap main--grid">
      {courses.map((course) => {
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
      })}
    </div>
  );
};

export default Courses;
