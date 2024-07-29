import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

const Post = forwardRef(
  ({ name, description, message, photoUrl, reaction }, ref) => {
    const user = useSelector(selectUser);

    return (
      <div className="mb-2.5 rounded-lg bg-[#27292D] border-[#35373B] border-[2px] px-5 py-6">
        <div className="mb-2.5 flex justify-between items-center ">
          <div className="flex items-center space-x-6">
            <img
              src={photoUrl || "/png/Ellipse 2.png"}
              alt="user profile "
              className="w-[44px] h-[44px]"
            />
            <div className="post__info">
              <h2 className="text-[#C5C7CA] text-base capitalize">{name}</h2>
              <p className="text-[#7F8084]">{description}</p>
            </div>
          </div>

          <img src="/svg/Shape.svg" alt="Shape" />
        </div>
        <div className="flex space-x-2 bg-[#191920] p-4 rounded-lg mt-5">
          <div className="flex-[0.2]">
            <div className="bg-[#27292D] h-[48px] w-[48px] flex items-center justify-center rounded-full  ">
              <span className="text-xl">{reaction || "👋"}</span>
            </div>
          </div>

          <div className=" w-full px-3 text-[#7F8084]">{message}</div>
        </div>
        <div className="flex justify-start items-center mt-3.5">
          <div className="flex items-center space-x-2 ">
            <img
              src="/png/Chat Bubble.svg"
              alt="chat bubble"
              className="w-5 h-5 "
            />

            <span className="text-[#7F8084] text-sm">24 Comments</span>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
