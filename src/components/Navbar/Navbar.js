import React, { useState, useEffect } from "react";
import "./Navbar.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [username,setusername]=useState();
  // console.log(auth?.username);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const navigate = useNavigate();

  useEffect(()=>{
    const data = localStorage.getItem("auth");
    const parseData = JSON.parse(data);
    console.log("authdata",parseData)
    if(parseData?.username==null){
    setusername(parseData?.username);
    }else{
      setusername("");
    }
  },[])

  const handleLogout = () => {
    // setAuth({
    //   ...auth,
    //   username: null,
    // organization: "",
    // });
    setusername("");
    localStorage.removeItem("auth");
    setAuth(null);
    toast.success("Logout Success");
    navigate("/login");
  };
  return (
    <div className=" navbar_main">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
      
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mr-10">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Abouts
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>  
              <li className="nav-item">
                <a className="nav-link" style={{cursor:"pointer"}} onClick={handleLogout}>Sign out
                </a>
              </li> 
                   
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
