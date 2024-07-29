import React, { useState, FormEvent } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginToApp = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
        navigate("/");
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="flex flex-col items-center ">
      <img src="/png/Logo.png" alt="placeholder logo" />

      <div className="border-[#969696] bg-[#27292D] lg:px-6 px-4 lg:py-10 py-6 border-[2px] rounded-md mt-[50px]">
        <div className="flex flex-col  space-y-[6px] items-center">
          <h5 className="text-[#6B6C70] uppercase text-sm">WELCOME BACK</h5>
          <h6 className="font-semibold text-white text-lg">
            Log into your account
          </h6>
        </div>
        <div className="flex flex-col space-y-3 mt-11">
          <form className="flex flex-col space-y-2.5">
            <div className="">
              <p className="text-[#C5C7CA] font-semibold  lg:text-sm text-xs">
                Email or Username
              </p>
              <input
                type="text"
                className="mt-2.5 lg:w-[417px] w-full lg:h-[45px] h-10 rounded-md bg-transparent placeholder:text-[#7F8084] text-white lg:text-base text-sm  border-[#35373B]
              outline-none border px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-[#C5C7CA] font-semibold lg:text-sm text-xs">
                  Password
                </p>
                <p className="text-[#C5C7CA] font-semibold lg:text-sm text-xs">
                  Forgot password?
                </p>
              </div>
              <div className="relative mt-2.5">
                <input
                  type="text"
                  className="mt-2.5 lg:w-[417px] w-full lg:h-[45px] h-10 rounded-md bg-transparent placeholder:text-[#7F8084] text-white lg:text-base text-sm  border-[#35373B]
              outline-none border px-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <img
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7F8084] cursor-pointer"
                  src="/svg/eye.svg"
                  alt="eye"
                />
              </div>
            </div>

            <button
              onClick={loginToApp}
              className="bg-[#4A96FF] md:py-3 py-2 rounded-[4px] text-white font-semibold cursor-pointer"
            >
              Login now
            </button>
          </form>

          <p className=" lg:text-sm text-xs text-[#7F8084]">
            Not registered yet?
            <span className="text-white" onClick={() => navigate("/posts")}>
              {" "}
              Register →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
