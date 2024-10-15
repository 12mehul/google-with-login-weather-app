import React from "react";
import Weather from "./Weather";

const Profile = ({ profile, logout }) => {
  return (
    <div>
      <div className="p-5 flex items-start justify-between">
        <div className="flex flex-col gap-3 items-center">
          <img
            src={profile.picture}
            alt="profile"
            className="rounded-full h-24 w-24"
          />
          <h2 className="font-bold text-2xl text-gray-800">{profile.name}</h2>
          <h2 className="font-bold text-2xl text-gray-800">{profile.email}</h2>
        </div>
        <button
          className="w-80 text-center text-xl font-normal bg-red-500 text-white py-3 rounded-md hover:bg-red-400"
          onClick={logout}
        >
          Log out
        </button>
      </div>
      <div className="p-5">
        <Weather />
      </div>
    </div>
  );
};

export default Profile;
