export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://codepath-parse-demo-api.herokuapp.com"
    : "http://localhost:3001";

// module.exports = {
//   REACT_APP_GOOGLE_MAPS_API_KEY: "AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0",
// };
// const REACT_APP_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
