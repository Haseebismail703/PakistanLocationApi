import React from "react";

function Footer() {
  return (
    <div>
      <footer className="bg-base-200 rounded-lg shadow-sm p-4 m-4">
        <div className="w-full max-w-screen-xl mx-auto md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="http://localhost:5173/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/8627/8627947.png"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Pakistan location Api
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-base-content sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-base-300 sm:mx-auto lg:my-8" />
          <span className="block text-sm text-base-content sm:text-center">
            © 2025{" "}
            <a href="http://localhost:5173/" className="hover:underline">
              Pakistan location api™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
