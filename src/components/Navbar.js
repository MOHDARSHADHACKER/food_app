import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { Button } from "react-bootstrap";


export default function Navbar(props) {
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic fw-bold" to="/">FoodApp</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {localStorage.getItem("token") ?
                <li className="nav-item">
                <Button className="btn btn-success" onClick={props.handleShowOrders}>
                   My Orders
                </Button>
                </li>
              : ""}
            </ul>

            {!localStorage.getItem("token") ?
              <div className='d-flex'>
                <Link className="btn bg-white text-black mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-black mx-1" to="/signup">Signup</Link>
              </div>
              :
              <div>
                <div className="btn bg-white text-black mx-2" onClick={() => { setCartView(true) }}>
                  My cart {" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                </div>

                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

                <div className="btn bg-danger text-black mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}


