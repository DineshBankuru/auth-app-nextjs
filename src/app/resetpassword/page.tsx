"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const [user, setUser] = React.useState({
    userId: "",
    password: "",
  });

  const Submit = async () => {
    try {
      await axios.post("/api/users/resetpassword", user);
      router.push("/login");
    } catch (error: any) {
      console.log(error.reponse);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    // setUserId(urlToken || "");
    setUser({ ...user, userId: urlToken });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Enter New Password</h1>

      <label htmlFor="email">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="......."
      />

      <button
        onClick={Submit}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Submit
      </button>
    </div>
  );
}
