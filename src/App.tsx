import Login from "./Login";
import Feed from "./Feed";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./features/userSlice";
import Signup from "./Signup";

function App() {
  const dispatch = useDispatch();
  const [authUser, setAuthUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
        setAuthUser(userAuth?.displayName);
      } else {
        dispatch(logout());
        navigate("/");
      }
    });
  }, [authUser, dispatch]);

  return (
    <div className="flex justify-center items-center bg-[#131319] min-h-screen pb-5 font-inter">
      <Routes>
        <Route path="/" element={!authUser ? <Signup /> : <Feed />} />
        <Route path="/login" element={!authUser ? <Login /> : <Feed />} />
        <Route path="/posts" element={<Feed />} />
      </Routes>
    </div>
  );
}

export default App;
