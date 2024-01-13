const apiBaseUrl = "http://localhost:5000/api";

export const call = (
  apiPath,
  method = "GET",
  body = null,
  credentials = null
) => {
  const url = apiBaseUrl + apiPath;

  const options = {
    method,
    headers: {},
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  if (credentials) {
    const base64Credentials = btoa(
      `${credentials.emailAddress}:${credentials.password}`
    );
    options.headers.Authorization = `Basic ${base64Credentials}`;
  }
  return fetch(url, options);
};

export const signIn = (credentials) => {
  const apiPath = "/users";
  return call(apiPath, "GET", null, credentials);
};

export const getAllCourses = () => {
  const apiPath = "/courses";
  return call(apiPath);
};

export const getCourseById = (courseId) => {
  const apiPath = "/courses/" + courseId;
  return call(apiPath);
};

export const createCourse = (courseData, credentials) => {
  const apiPath = "/courses";
  return call(apiPath, "POST", courseData, credentials);
};
