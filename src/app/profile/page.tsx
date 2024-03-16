"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async (e: any) => {
    // e.preventDefault();
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout successful!", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed!", error.message);
    }
  };

  const getUserDetails = async (e: any) => {
    // e.preventDefault();
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
    console.log(data);
  };

  return (
    <div className="mt-6 text-3xl text-center text-extrabold">
      <h1>Profile Page</h1>
      <hr />
      <button onClick={(e) => logout(e)}>Logout</button>
      <hr />
      <h2>
        {data === "nothing" ? (
          "No user"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button onClick={(e) => getUserDetails(e)}>Get User Details</button>
    </div>
  );
}

export default Profile;
