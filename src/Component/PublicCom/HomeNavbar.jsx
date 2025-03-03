import React from "react";
import { useNavigate } from "react-router-dom";
import ThemContButton from "./ThemContButton";
import logo from '../../assets/logo.png';
const HomeNavbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    const section = document.getElementById(key); // Check if section exists on the page

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${key}`); // Navigate to Home with section ID
      setTimeout(() => {
        const newSection = document.getElementById(key);
        if (newSection) {
          newSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Delay to allow navigation
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 sm:px-8 fixed top-0 left-0 right-0 z-50">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Dropdown for Mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => handleMenuClick("home")}>Home</a>
            </li>
            <li>
              <a onClick={() => handleMenuClick("about")}>About</a>
            </li>
            <li>
              <a onClick={() => handleMenuClick("services")}>Services</a>
            </li>
            <li>
              <a onClick={() => handleMenuClick("contact")}>Contact</a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        {/* <a className="btn btn-ghost normal-case text-xl">Pakistan Location API</a> */}
        <div className="logo" style={{ marginRight: "20px" }}>
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
      </div>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => handleMenuClick("home")}>Home</a>
          </li>
          <li>
            <a onClick={() => handleMenuClick("feature")}>Feature</a>
          </li>
          <li>
            <a onClick={() => handleMenuClick("how its work")}>How It Works</a>
          </li>
          <li>
            <a onClick={() => handleMenuClick("pricing")}>Pricing</a>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <ThemContButton />
      </div>
    </div>
  );
};

export default HomeNavbar;
