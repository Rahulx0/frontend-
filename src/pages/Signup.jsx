import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
//all hooks in react start with "use"
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null)

  console.log(username, email, password);
  const navigate = useNavigate();
  //funtion to signup user
  const handleSignup = async (e) => {
    e.preventDefault(); // stop page reload


    try {
      setLoading(true);
      setError
      const res = await axios.post(
        "http://localhost:4000/api/register",
        {
          username,
          email,
          password
        }
      );
      console.log("Signup response from the signup api:", res.data);
      //redirecting to signin page after successful signup
      if (res.data.user) {
        navigate("/Signin");
      }
      // sorting the error message from bacnend response
      if (!res.data.user) {
        setError(res.data.message)
      }
      setLoading(false);

      console.log(res.data);

    } catch (err) {
      console.log("Error while signup", err.message);
      setLoading(false);
      setError("All fields are required ")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      {/* Signup form */}
      <div>
        <form onSubmit={handleSignup} className="flex flex-col gap-3 border-2 border-black p-16 rounded-lg">

          <h1 className="text-3xl font-bold text-center">Signup</h1>

          <input
            className="text-2xl border-2 border-black p-4 outline-none rounded-lg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}

            placeholder="Username"
          />

          <input
            className="text-2xl border-2 border-black p-4 outline-none rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="text-2xl border-2 border-black p-4 outline-none rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-center">
            <button className="bg-blue-500 w-32 text-xl p-2 rounded-lg cursor-pointer text-white">
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>

          <p className="text-md text-gray-500 text-center">
            Already have an account?{' '}
            <NavLink to="/Signin" className="text-blue-600 cursor-pointer">
              Sign in
            </NavLink>
          </p>
          <p className="font-semibold text-red-500 text-center">{err ? err : null}</p>
        </form>
      </div>

      {/* LinkedIn Logo */}
      <div>
        <img
          className="w-[50rem]"
          src="https://assets.turbologo.com/blog/en/2025/03/21134124/logo-Linkedin.png"
          alt="linkedin_logo"
        />
      </div>

    </div>
  );
};

export default Signup;