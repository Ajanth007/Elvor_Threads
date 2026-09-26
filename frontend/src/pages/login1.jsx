import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const Handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      });

      dispatch({
  type: "LOGIN",
  payload: {
    token: response.data.token,
    username: response.data.user.username,
    id: response.data.user.id,
  },
});

      localStorage.setItem("token", response.data.token);

      setUsername("");
      setPassword("");
      alert("User logged in successfully");

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2F3A2F]">Welcome Back</h1>

          <p className="text-gray-500 mt-2">Login to your account</p>
        </div>

        {/* Login Form */}
        <form className="space-y-5 " onSubmit={Handlelogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              UserName
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your userName"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B9A6E] focus:border-[#8B9A6E]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B9A6E] focus:border-[#8B9A6E]"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-[#8B9A6E]" />
              Remember me
            </label>

            <button type="button" className="text-[#6F7D55] hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#8B9A6E] text-white py-3 rounded-lg font-semibold hover:bg-[#75855B] transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to = '/register'>
          <button className="text-[#6F7D55] font-semibold hover:underline">
            Sign Up
          </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
