import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadProfilePhoto } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ImageUpload = () => {
  const [avatar, setAvatar] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append("avatar", avatar);
    if (avatar.length !== 0) {
      dispatch(uploadProfilePhoto(formData))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setAvatar([]);
          navigate("/");
        })
        .catch((error) => {
          toast.error(error);
          setAvatar([]);
        });
    }
  };

  return (
    <div className=" my-80 w-full h-full flex  bg-opacity-60">
      <div className="extraOutline p-4 bg-base-300 w-max  m-auto rounded-lg">
        <div className="file_upload p-5 relative " style={{ width: 450 }}>
          {avatar.length === 0 && (
            <svg
              className="text-indigo-500 w-24 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          )}
          {avatar.length !== 0 && (
            <div className="avatar flex justify-center mb-3 ">
              <div className="w-36 h-36  rounded-full ">
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                  className=" text-center"
                />
              </div>
            </div>
          )}
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input
                className="text-sm cursor-pointer w-36 hidden"
                type="file"
                required
                accept="image/*"
                id="avatar"
                multiple={false}
                onChange={imageChange}
              />
              {avatar.length === 0 ? (
                <div className="btn">Select Profile Picture</div>
              ) : (
                <>
                  <div className="btn">Select New Picture</div>
                  <button
                    className="btn ms-3 btn-info"
                    onClick={handleUpload}
                    disabled={status === "pending"}
                  >
                    Upload
                  </button>
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
