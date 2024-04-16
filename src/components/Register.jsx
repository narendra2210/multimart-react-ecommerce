import axios from "axios";
import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/Apiroutes";
import "./login.css";

const Register = () => {

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role:"",
  });

  useEffect(() => {
    if (localStorage.getItem("Scaler")) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
   // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password,username, email}  = values;
     if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        const { email, username, password, role } = values;
        console.log(role);
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          role,
        });
       // console.log(data);
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
        //  localStorage.setItem("chat-app-current-user", JSON.stringify(data.user));
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Axios request error:", error);
      toast.error("An error occurred while trying to register. Please try again.", toastOptions);
    }
  };
  

  return (
    <div className="login">
        <h4>Sign up</h4>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="text_area">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className='text_input'
            onChange={(e) => handleChange(e)}
          />
          </div>
        <div className="text_area">
        <input
            type="email"
            placeholder="Email"
            name="email"
            className='text_input'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="text_area">
        <input
            type="password"
            placeholder="Password"
            name="password"
            className='text_input'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mx-2">
        <label class="form-label" for="seller">Seller</label>
        <input class="form-check-input" type="radio" name="role" value="seller" id="seller" aria-label="Radio button for following text input"  checked={values.role === "seller"}   onChange={(e) => handleChange(e)}/>
        </div>
        <div className="mx-2">
        <label class="form-label" for="buyer">Buyer</label>
        <input class="form-check-input" type="radio" name="role" value="buyer" id="buyer" aria-label="Radio button for following text input" checked={values.role === "buyer"}   onChange={(e) => handleChange(e)}/>
        </div>
        <input
        id="btnnn"
            type="submit"
            value="SIGN IN"
            className="btn"
          />
        </form>
        <Link to="/login" className="link" id="logiin">Login</Link>
        <ToastContainer/>
    </div>
  )
}

export default Register