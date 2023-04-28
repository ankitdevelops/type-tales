import React from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 my-4 ">
      <div className="card ">
        <div className="card w-full md:w-3/4 bg-base-300 shadow-xl mx-auto">
          <div className="card-body ">
            <h2 className="card-title flex justify-center text-3xl">
              <FaUserAlt />
              Get Your Account Now!
            </h2>
            <form action="">
              <div className="form-control mx-auto md-full md:w-3/4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered mx-auto w-full"
                />
              </div>
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
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
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
              <div className="form-control mx-auto md-full md:w-3/4">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Your Password"
                  className="input input-bordered mx-auto w-full"
                />
              </div>
              <div className="form-control mx-auto md-full md:w-3/4 mt-4">
                <button className="btn  w-full" type="submit">
                  Register Now
                </button>
              </div>

              <p className="mt-2 text-center">
                Already have an account,
                <Link to="/login" className="link link-warning">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
