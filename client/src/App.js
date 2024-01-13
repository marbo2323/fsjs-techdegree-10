import { Route, Routes } from "react-router-dom";
import Courses from "./components/Courses";
import Header from "./components/Header";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const fetchCourse = async (courseId) => {
    //console.log("fetchCourses");
    const url = "http://localhost:5000/api/courses/" + courseId;
    const fetchOptions = {
      method: "GET",
    };
    const result = await fetch(url, fetchOptions);
    const data = await result.json();
    return data;
  };

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route
              path="/courses/:id/update"
              element={<UpdateCourse loadCourse={fetchCourse} />}
            />
          </Route>

          <Route
            path="/courses/:id"
            element={<CourseDetail loadCourse={fetchCourse} />}
          />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signout" element={<UserSignOut />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
