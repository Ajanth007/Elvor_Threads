import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../config/env";

const api= apiURL.Url
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${api}/auth/register`, {
        username,
        password,
      });

      alert(response.data);

      setUsername("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#F7F2EB" }}>
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-xl" style={{ backgroundColor: "#EAE2D6" }}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-center mb-2" style={{ color: "#8B9A6E" }}>
          Elvor Threads
        </p>

        <h1 className="text-3xl font-semibold text-center tracking-tight mb-2" style={{ color: "#2F3A25" }}>
          Register
        </h1>

        <p className="text-center text-sm mb-8" style={{ color: "#3A362F" }}>Create your account</p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#2F3A25" }}>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none transition-colors focus:ring-2"
              style={{ borderColor: "#D9CFBE", backgroundColor: "#F7F2EB", "--tw-ring-color": "#8B9A6E" }}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: "#2F3A25" }}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg outline-none transition-colors focus:ring-2"
              style={{ borderColor: "#D9CFBE", backgroundColor: "#F7F2EB", "--tw-ring-color": "#8B9A6E" }}
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
            style={{ backgroundColor: "#2F3A25" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#526044")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2F3A25")}
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: "#3A362F" }}>
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium hover:underline"
            style={{ color: "#8B9A6E" }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
