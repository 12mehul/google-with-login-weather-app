import React, { useEffect, useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Profile from "./Profile";

function Login() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 401) {
            setProfile(null);
          } else {
            setProfile(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logout = () => {
    googleLogout();
    setProfile({});
  };

  return (
    <div>
      {profile && profile?.email ? (
        <Profile profile={profile} logout={logout} />
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center h-screen">
          <h2 className="font-bold text-3xl text-gray-800">
            React With Google Login
          </h2>
          <button
            className="w-80 text-xl font-normal bg-blue-500 text-white py-3 rounded-md hover:bg-blue-400"
            onClick={() => googleLogin()}
          >
            Sign in with Google 🚀
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
