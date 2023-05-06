import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, username, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password.length < 9) {
      toast.error("Password too short");
    } else if (password !== password2) {
      toast.error("Password Don't Match");
    } else {
      const userData = {
        name,
        email,
        username,
        password,
        password2,
      };

      dispatch(registerUser(userData))
        .unwrap()
        .then((user) => {
          console.log(user);
          toast.success(`${user.user.name}, Account Created Successfully`);
          navigate("/");
        })
        .catch((error) => toast.error(error));
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container mx-auto px-4  h-[90vh] ">
      <div className="flex justify-center w-full flex-col   content-center h-full">
        <div className="card ">
          <div className="card w-full md:w-1/2 bg-base-300 shadow-xl mx-auto">
            <div className="card-body ">
              <h2 className="card-title flex justify-center text-3xl">
                <FaUserAlt />
                Get Your Account Now!
              </h2>
              <form action="" onSubmit={onSubmit}>
                <div className="form-control mx-auto  ">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered mx-auto w-full"
                    name="name"
                    id="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-control mx-auto  ">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your_email@example.com"
                    className="input input-bordered mx-auto w-full"
                    name="email"
                    id="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-control mx-auto  ">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="username"
                    className="input input-bordered mx-auto w-full"
                    name="username"
                    id="username"
                    value={username}
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
                    name="password"
                    id="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-control mx-auto  ">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Your Password"
                    className="input input-bordered mx-auto w-full"
                    name="password2"
                    id="password2"
                    value={password2}
                    onChange={onChange}
                  />
                </div>
                <div className="form-control mx-auto  mt-4">
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
    </div>
  );
};

export default RegisterPage;
