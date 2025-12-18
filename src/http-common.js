import axios from "axios";

export default axios.create({
  baseURL: "https://food-backend-app-pvw1.onrender.com/",
  headers: {
    "Content-Type": "application/json"
  }
});
