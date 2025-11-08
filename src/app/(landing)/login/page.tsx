"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/_service/auth";
export default function Login() {
  const [inputs, setInputs] = useState({ userid: "", password: "" });
  const router = useRouter();
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const result = await login(inputs);
      localStorage.setItem("token", result.data[0].token);
      router.push("/beranda");
    } catch (error: any) {
      console.log(error);
    } finally {
    }
  };

  // const handleclear = () => {
  //   setinputs({ userid: "", password: "" });
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="userid"
            value={inputs.userid || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
      {/* <button onClick={handleClear}>Kosongkan </button> */}
    </div>
  );
}
