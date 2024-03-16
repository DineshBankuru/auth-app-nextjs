"use client";

import axios from "axios";
import { useScroll } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ForgotPassowrd() {
  const [email, setEmail] = useState("");

  const Submit = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
    } catch (error: any) {
      console.log(error.reponse.data);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>

      <label htmlFor="email">email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
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
