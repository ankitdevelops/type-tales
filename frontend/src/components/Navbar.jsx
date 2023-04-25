import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaGithub } from "react-icons/fa";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="bg-base-300">
      <div className="navbar container mx-auto  py-3">
        <div className="navbar-start">
          <a href="dsf" className="btn btn-ghost normal-case text-xl">
            Type~Tales
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
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
        </div>
        <div className="navbar-end ">
          {isAuthenticated ? (
            <a href="dfd" className="btn">
              Login Now
            </a>
          ) : (
            <div className="form-control w-80">
              <input
                type="text"
                placeholder="Search People"
                className="input input-bordered"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
