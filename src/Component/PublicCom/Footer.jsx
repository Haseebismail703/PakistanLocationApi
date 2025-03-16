import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";

function Footer() {
  const navigate = useNavigate();

  // Scroll Function
  const scrollToSection = (id) => {
    navigate("/"); // Ensure we're on the home page before scrolling
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Delay for smooth navigation
  };

  return (
    <div>
      <footer className="bg-base-200 rounded-lg shadow-sm p-4 m-4">
        <div className="w-full max-w-screen-xl mx-auto md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Pakistan Location API
              </span>
            </a>

            {/* Navigation Links */}
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-base-content sm:mb-0">
              <li>
                <button onClick={() => scrollToSection("home")} className="hover:underline me-4 md:me-6">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("pricing")} className="hover:underline me-4 md:me-6">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("how its work")} className="hover:underline me-4 md:me-6">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("feature")} className="hover:underline">
                  Features
                </button>
              </li>
            </ul>
          </div>

          {/* Separator */}
          <hr className="my-6 border-base-300 sm:mx-auto lg:my-8" />

          {/* Copyright */}
          <span className="block text-sm text-base-content sm:text-center">
            © 2025{" "}
            <a href="/" className="hover:underline">
              Pakistan Location API™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
