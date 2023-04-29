import React, { useState } from "react";
import { FaHouseUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    if (!email) {
      console.log("Email is required");
    }

    if (!password) {
      console.log("Password is required");
    }

    dispatch(loginUser(userData))
      .unwrap()
      .then((user) => {
        console.log(`Logged in as ${user.user.name}`);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto px-4  h-[90vh] ">
      <div className="flex justify-center w-full flex-col   content-center h-full">
        <div className="card ">
          <div className="card w-full md:w-1/2 bg-base-300 shadow-xl mx-auto">
            <div className="card-body ">
              <h2 className="card-title flex justify-center text-3xl">
                <FaHouseUser />
                Welcome Back
              </h2>
              <form action="" onSubmit={onSubmit}>
                <div className="form-control mx-auto  ">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="your_email@example.com"
                    className="input input-bordered mx-auto w-full"
                    value={email}
                    name="email"
                    id="email"
                    onChange={onChange}
                  />
                </div>

                <div className="form-control mx-auto  ">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Strong Password"
                    className="input input-bordered mx-auto w-full"
                    value={password}
                    name="password"
                    id="password"
                    onChange={onChange}
                  />
                </div>

                <div className="form-control mx-auto  mt-4">
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
    </div>
  );
};

export default LoginPage;
