import React, { useState, FormEvent } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  closeSignup?: () => void;
}

const Signup: React.FC<SignupProps> = ({ closeSignup }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name) {
      return alert("Please enter a full name to proceed");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        })
          .then(() => {
            console.log("user data", userAuth.user.email);

            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
            navigate("/posts");
          })
          .catch((error) => console.log("update profile error message", error));
      })
      .catch((error) => alert("error message: " + error.message));
  };

  return (
    <div className="flex flex-col items-center ">
      <img src="/png/Logo.png" alt="placeholder logo" />

      <div className="relative border-[#969696] bg-[#27292D] lg:px-6 px-6 lg:py-10 py-6 border-[2px] rounded-md mt-[50px]">
        <div
          className="absolute right-3 top-3 bg-[#131319] p-2.5 rounded-full cursor-pointer"
          onClick={closeSignup}
        >
          <img src="/svg/close.svg" alt="close icon" />
        </div>
        <div className="flex flex-col space-y-[6px] items-center">
          <h5 className="text-[#6B6C70] uppercase text-sm">SIGN UP</h5>
          <h6 className="font-semibold text-white text-lg">
            Create an account to continue
          </h6>
        </div>
        <div className="flex flex-col space-y-3 mt-11">
          <form className="flex flex-col space-y-2.5">
            <div className="">
              <p className="text-[#C5C7CA] font-semibold lg:text-sm text-xs">Email</p>
              <input
                type="text"
                className="mt-2.5 lg:w-[417px] lg:h-[45px] rounded-md bg-transparent placeholder:text-[#7F8084] text-white text-base  border-[#35373B]
              outline-none border px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="">
              <p className="text-[#C5C7CA] font-semibold  lg:text-sm text-xs">Username</p>
              <input
                type="text"
                className="mt-2.5 lg:w-[417px] lg:h-[45px] rounded-md bg-transparent placeholder:text-[#7F8084] text-white text-base  border-[#35373B]
              outline-none border px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Choose a preferred username"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[#C5C7CA] font-semibold lg:text-sm text-xs">Password</p>
              <div className="relative mt-2.5">
                <input
                  type="text"
                  className="lg:w-[417px] lg:h-[45px] rounded-md bg-transparent placeholder:text-[#7F8084] text-white text-base border-[#35373B]
      outline-none border px-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a strong password"
                />
                <img
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7F8084] cursor-pointer"
                  src="/svg/eye.svg"
                  alt="eye"
                />
              </div>
            </div>

            <button
              onClick={register}
              className="bg-[#4A96FF] lg:py-3  py-2 rounded-[4px] text-white font-semibold"
            >
              Continue
            </button>
          </form>

          <p className="lg:text-sm text-[#7F8084]">
            Already have an account?
            <span className="text-white" onClick={() => navigate("/login")}>
              {" "}
              Login →
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
