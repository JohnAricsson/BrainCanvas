const API_BASE_URL = import.meta.env.PROD
  ? "https://braincanvas-m4ca.onrender.com"
  : "http://localhost:5001";

export default API_BASE_URL;
