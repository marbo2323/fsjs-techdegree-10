import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);

  async function getCourses() {
    const url = "http://localhost:5000/api/courses";
    const fetchOptions = {
      method: "GET",
    };
    const result = await fetch(url, fetchOptions);
    const courses = await result.json();
    console.log();
    setCourses(courses);
  }

  useEffect(() => {
    getCourses();
  });

  return (
    <div className="App">
      <ul>
        {courses.map((course, i) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
