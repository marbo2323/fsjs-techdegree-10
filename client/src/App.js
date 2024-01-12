import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Courses from "./components/Courses";
import Header from "./components/Header";
import CreateCourse from "./components/CreateCourse";

function App() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    console.log("fetchCourses");
    const url = "http://localhost:5000/api/courses";
    const fetchOptions = {
      method: "GET",
    };
    const result = await fetch(url, fetchOptions);
    const data = await result.json();
    setCourses(data);
  };

  useEffect(() => {
    console.log("useEffect");
    fetchCourses();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses courses={courses} />} />
          <Route path="/courses/create" element={<CreateCourse />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
