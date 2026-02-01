import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import bgImage from '../assets/images/bgImage.jpg';
import { handleError } from '../utils';

export default function Login() {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('All fields are required')
    }


    try {
      const res = await axios.post("https://food-backend-app-pvw1.onrender.com/api/fooditems/login", loginInfo);
      console.log(res.data);
      localStorage.setItem("userEmail", res.data.email);   //email set kia hai yaha
      localStorage.setItem("token", res.data.token);
      console.log("Saved Token:", localStorage.getItem("token"));
      console.log("Saved Email:", localStorage.getItem("email"));

      toast.success(res.data.message); // ✅ Success Toast
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      handleError(err.response?.data?.message || "Something went wrong"); // ❌ Error Toast
    }
  };


  return (
    <>
     <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: `url(${bgImage})` }}>
  <div className="card" style={{ width: "18rem", height: "20rem" }}>
      <div className='container'>
        <form onSubmit={handleLogin}>

          <div className="mb-3 mt-5">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={loginInfo.email} />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" name="password" value={loginInfo.password} />

          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <span>Don't have an account ?
            <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
      </div>
      </div>
    </>
  )
}
