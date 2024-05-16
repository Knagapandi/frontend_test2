import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [username, setusername] = useState("");
  const [organization, setorganization] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      const res = await axios.post(`http://localhost:8000/signup`, {
        username,
        organization,
        password,
        role,
      });
      if (res && res.status === 201) {
        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="Login">
      <div className="loginw">
        <span>Hi! Welcome To Legacies AI</span>
      </div>
      <div className="loginCard">
        <h1>Signup</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <label>Already Login?</label>{" "}
          <button
            style={{
              background: "transparent",
              border: "none",
              color: "blue",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Login Here
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginTop: "53px",
          }}
        >
          

          <span>
            <strong>Email</strong>
          </span>
          <input
            type="text"
            placeholder="Enter your email"
            className="signupinput"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />

              
           <span>
            <strong>Password</strong>
          </span>
          <input
            type="password"
            placeholder="Enter Password"
            className="signupinput"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
       
         

          <span>
            <strong>Role</strong>
          </span>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="signupinput"
            value={role}
            onChange={(e) => setrole(e.target.value)}
            required
          />


        <span>
            <strong>Organization</strong>
          </span>
          <input
            type="text"
            placeholder="Enter your name"
            className="signupinput"
            value={organization}
            onChange={(e) => setorganization(e.target.value)}
            required
          />
          </div>
          <br />
      

        <button
          onClick={() => handleSubmit()}
          style={{
            width: "470px",
            height: "49px",
            borderRadius: "15px",
            background: "blue",
            border: "none",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Signup;
