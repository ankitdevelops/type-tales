import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-base-300">
      <div className="navbar container mx-auto  py-3">
        <div className="navbar-start">
          <Link to={"/"} role="btn">
            {/* Type~Tales */}
            <img src={Logo} alt="brand-logo" className="w-20" />
          </Link>
        </div>

        <div className="navbar-end ">
          {user ? (
            <>
              <button className="btn ml-3" onClick={onLogout}>
                <FaSignOutAlt size={24} />
              </button>
            </>
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
