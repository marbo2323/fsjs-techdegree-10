import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";

const CourseDetail = ({ loadCourse }) => {
  const [course, setCourse] = useState();
  const { authUser } = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const courseData = await loadCourse(id);
      setCourse(courseData);
    })();
  }, []);

  if (course) {
    return (
      <>
        {" "}
        <div className="actions--bar">
          <div className="wrap">
            {authUser && authUser.id === course.user.id ? (
              <>
                <Link className="button" to={"/courses/" + id + "/update"}>
                  Update Course
                </Link>
                <Link className="button" to="#">
                  Delete Course
                </Link>{" "}
              </>
            ) : null}

            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>
                  By {course.user.firstName} {course.user.lastName}
                </p>

                {course.description
                  ? course.description
                      .split("\n")
                      .map((item, i) => <p key={i}>{item}</p>)
                  : null}
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {course.materialsNeeded
                    ? course.materialsNeeded
                        .split("\n")
                        .filter((item) => item)
                        .map((item, i) => (
                          <li key={i}>{item.replace("*", "")}</li>
                        ))
                    : null}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <div className="wrap">
        <h2>Course Detail</h2>
        <p>Loading...</p>
      </div>
    );
  }
};

export default CourseDetail;
