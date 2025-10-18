import './App.css';
import Home from './screens/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import ProtectedRoute from "./components/Proctected-route.js";
import { CartProvider } from './components/ContextReducer.js';
import MyOrders from "./components/MyOrder.js";


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            {/* <Route path="/home" element={<Home />}></Route> */}

            <Route path="/" element={<Navigate to="/signup" />} />

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/myorders" element={<MyOrders />}></Route>

            <Route
              path="/home" element={<ProtectedRoute> <Home />  </ProtectedRoute>} />
          </Routes>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
