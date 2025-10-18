import http from "../http-common";

class FoodService {
  getAll() {
    return http.get("/api/fooditems/food"); //  /food 👈 tumhara backend route
  }
}

export default new FoodService();