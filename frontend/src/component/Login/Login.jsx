import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    nameOrEmail: "",
    password: "",
  });
  console.log("newUser", newUser);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/users/login/", newUser)
      .then((res) => {
        console.log("res", res);
        alert(res.data.message);
        localStorage.setItem("user", res.data.userid);
        navigate("/");
      })
      .catch((error) => {
        console.log("error", error);

        alert("Please Registered first ", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container1">
        <div className="register">
          <h1>Login Page</h1>

          <input
            type="text"
            placeholder="username or Email address or phone number"
            name="nameOrEmail"
            value={newUser.nameOrEmail}
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
          />

          <div className="button" onClick={handleSubmit}>
            Login
          </div>

          <div className="Link1" onClick={() => navigate("/Register")}>
            Register
          </div>
          <div className="Link2" onClick={() => navigate("/ForgotAccount")}>
            Forgotten account?
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
