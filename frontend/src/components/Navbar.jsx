import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="bg-base-300">
      <div className="navbar container mx-auto  py-3">
        <div className="navbar-start">
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            Type~Tales
          </Link>
        </div>
        {/* <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <FaHome size={64} />
            </li>
            <li>
              <FaInfoCircle size={64} />
            </li>
            <li>
              <FaGithub size={64} />
            </li>
          </ul>
        </div> */}
        <div className="navbar-end ">
          {isAuthenticated ? (
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search People"
                  className="input input-bordered"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <Link to={"/login"} className="btn">
              Login Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
