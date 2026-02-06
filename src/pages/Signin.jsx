import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSucessfull } from '../redux/slices/userSlice';
//all hooks in react start with "use"
const Signin = () => {

const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null)

  console.log(email, password);
  const navigate = useNavigate();
  //funtion to signin user
  const handleSignin = async (e) => {


    e.preventDefault(); // stop page reload


    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        "https://backend-hcxk.vercel.app/api/signin",
        {
          email,
          password
        },
        { withCredentials: true }
      );
      console.log("Signin response from the signin api:", res.data);
      //redirecting to signin page after successful signup
      if (res.data.user) {
        dispatch(loginSucessfull(res.data.user));
        navigate("/");
      }
      // sorting the error message from bacnend response
      if (!res.data.user) {
        setError(res.data.message)
      }
      console.log(res.data);

    } catch (err) {
      console.log("Error while signup", err.message);
      setError(err?.response?.data?.message || "Signin failed. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-5xl items-center justify-center gap-8 px-6 lg:gap-10">

      {/* Signup form */}
      <div className="flex-shrink-0">
        <form onSubmit={handleSignin} className="flex flex-col gap-3 border-2 border-black p-16 rounded-lg">

          <h1 className="text-3xl font-semibold text-center">Signin</h1>

         

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
              {loading ? "Loading..." : "Signin"}
            </button>
          </div>

          <p className="text-md text-gray-500 text-center">
            Don't have an account?{' '}
            <NavLink to="/signup" className="text-blue-600 cursor-pointer">
              Create Account
            </NavLink>
          </p>
          <p className="font-semibold text-red-500 text-center">{err ? err : null}</p>
        </form>
      </div>

      {/* LinkedIn Logo */}
      <div className="flex-shrink-0">
        <img
          className="w-[35rem] max-w-full"
          src="https://assets.turbologo.com/blog/en/2025/03/21134124/logo-Linkedin.png"
          alt="linkedin_logo"
        />
      </div>

      </div>
    </div>
  );
};

export default Signin;