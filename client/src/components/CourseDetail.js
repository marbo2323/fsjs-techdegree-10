import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getCourseById, deleteCourse } from "../utils/apiClient";
import Markdown from "react-markdown";

const CourseDetail = () => {
  const [course, setCourse] = useState();
  const { authUser, credentials } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (authUser) {
      try {
        const confirmMessage = `Are you sure you want to delete the course "${course.title}"?`;
        if (!window.confirm(confirmMessage)) {
          return;
        }
        const response = await deleteCourse(id, credentials);
        if (response.status === 204) {
          navigate("/");
        } else {
          throw new Error(
            `An error occurred while deleting the course. The response status is ${response.status}.`
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    (async () => {
      const response = await getCourseById(id);
      if (response.status === 200) {
        const courseData = await response.json();
        setCourse(courseData);
      } else if (response.status === 404) {
        navigate("/notfound");
      }
    })();
  }, [id, navigate]);

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
                <Link className="button" to="#" onClick={handleDelete}>
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
                <Markdown>{course.description}</Markdown>
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <Markdown>{course.materialsNeeded}</Markdown>
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
