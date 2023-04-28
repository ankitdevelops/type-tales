import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 my-4 ">
      <div className="card ">
        <div className="card w-full md:w-3/4 bg-base-300 shadow-xl mx-auto">
          <div className="card-body ">
            <h2 className="card-title flex justify-center text-3xl">
              <FaUserAlt />
              Welcome Back!
            </h2>
            <form action="">
              <div className="form-control mx-auto md-full md:w-3/4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="your_email@example.com"
                  className="input input-bordered mx-auto w-full"
                />
              </div>
              <div className="form-control mx-auto md-full md:w-3/4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Your Strong Password"
                  className="input input-bordered mx-auto w-full"
                />
              </div>
              <div className="form-control mx-auto md-full md:w-3/4 mt-4">
                <button className="btn  w-full" type="submit">
                  Login Now
                </button>
              </div>

              <p className="mt-2 text-center">
                Don't have an account,
                <Link to="/register" className="link link-warning">
                  Create One
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
