import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Bgsignup from "../assets/images/SignupBg.jpg";
import { handleError } from '../utils';

export default function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('All fields are required')
        }


        try {
            const res = await axios.post("https://food-backend-app-pvw1.onrender.com/api/fooditems/signup", signupInfo);
            console.log(res.data);
            toast.success(res.data.message); // ✅ Success Toast
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            handleError(err.response?.data?.message || "Something went wrong"); // ❌ Error Toast
        }
    };

    return (
        <>
        <div>
<div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "100vh",          // 👈 height issue fix
    width: "100%",
    backgroundImage: `url(${Bgsignup})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>

  <div className="card" style={{ width: "18rem" }}>
                    <h5 className="card-title">Signup </h5>
                    <div className='container'>
                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input onChange={handleChange} type="text" className="form-control" name="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input onChange={handleChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={signupInfo.email} />
                                <div id="emailHelp" className="form-text"></div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" name="password" value={signupInfo.password} />

                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                            <span>Already have an account ?
                                <Link to="/login">Login</Link>
                            </span>

                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
          

        </>
    )
}