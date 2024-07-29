import React, { useEffect, useState } from "react";
import Post from "./Post";
import { auth, db } from "./firebase";
import {
  getDocs,
  collection,
  serverTimestamp,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { formatDistanceToNow, format } from "date-fns";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";

const Feed = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  const [isSignupOpen, setIsSignupOpen] = useState(true);
  const navigate = useNavigate();

  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPostList = async () => {
      try {
        const postsQuery = query(
          postsCollectionRef,
          orderBy("timestamp", "desc")
        );

        const data = await getDocs(postsQuery);

        const filteredData = data.docs.map((doc) => {
          const docData = doc.data();
          const createdAt = docData.timestamp.toDate();
          const now = new Date();

          let timeDisplay;
          const diffInMinutes = (now - createdAt) / (1000 * 60);

          if (diffInMinutes < 1440) {
            timeDisplay = formatDistanceToNow(createdAt, { addSuffix: true });
          } else {
            timeDisplay = format(createdAt, "yyyy-MM-dd HH:mm");
          }

          return {
            ...docData,
            id: doc.id,
            timeDisplay,
          };
        });
        setPosts(filteredData);
      } catch (e) {
        console.error(e);
      }
    };

    getPostList();
  }, [postsCollectionRef]);

  const sendPost = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.log(e);
    }

    setInput("");
  };
  const dispatch = useDispatch();

  const logOutApp = () => {
    dispatch(logout());
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="">
      <div className="max-w-[700px] lg:w-[700px] px-5">
        <h4 className="md:text-3xl text-2xl text-[#C5C7CA] mt-[69px] capitalize">
          Hello {user?.displayName || "Jane"}{" "}
        </h4>
        <p className="text-base text-[#7F8084] lg:w-[580px] mt-3.5">
          How are you doing today? Would you like to share something with the
          community 🤗
        </p>
        <button
          className={`${
            !user && "hidden"
          } text-white bg-[#35373B] hover:scale-105 transition-transform duration-200 md:px-9 px-5 md:py-3 py-2 h-fit rounded-[6px] mt-4`}
          onClick={logOutApp}
        >
          LOGOUT
        </button>

        <div className="mt-10 flex flex-col space-y-4">
          <div className="rounded-lg bg-[#27292D] border-[#35373B] border-[2px] px-5 py-6">
            <h4 className="text-[#C5C7CA] text-lg mb-3">Create Post</h4>
            <div className="border-none flex px-4 py-3 rounded-lg  bg-[#191920]">
              <div className="bg-[#27292D] p-2 rounded-full cursor-pointer">
                💬
              </div>
              <form className="bg-[#191920] flex w-full ">
                <input
                  type="text"
                  value={input}
                  placeholder="How are you feeling today?"
                  onChange={(e) => setInput(e.target.value)}
                  disabled={!user}
                  className="border-none flex-1 ml-2.5 outline-none bg-transparent text-white placeholder:text-[#7F8084] disabled:cursor-not-allowed"
                />

                <button className="hidden" onClick={sendPost} type="submit">
                  Send
                </button>
              </form>
            </div>
            <div className="flex justify-end items-center">
              <button
                onClick={sendPost}
                className="bg-[#4A96FF] md:px-9 px-5 md:py-3 py-2 h-fit rounded-[6px] mt-4 text-white text-base"
                type="submit"
              >
                Post
              </button>
            </div>
          </div>

          {/* Static post  */}
          <Post
            name="Theresa Webb"
            description="5mins ago"
            message="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
            photoUrl={"/png/Ellipse 2.png"}
          />
          <Post
            name="Marvin McKinney"
            description="8mins ago • Edited"
            message="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
            photoUrl={"/png/Ellipse 3.png"}
            reaction={"😞"}
          />
          {/* Posts  */}
          {posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              description={post.timeDisplay}
              message={post.message}
              photoUrl={post.photoUrl}
            />
          ))}
        </div>
      </div>

      <div
        className={`${
          isSignupOpen ? "fixed" : "hidden"
        } w-full left-0 top-0 h-screen z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm`}
      >
        <Signup closeSignup={() => setIsSignupOpen(false)} />
      </div>
    </div>
  );
};

export default Feed;
