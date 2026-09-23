import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Register =() => {
      const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   console.log("Username:", username);
  //   console.log("Password:", password);


  //   axios.post("http://localhost:3001/register",{
  //     username:username,
  //     password:password
  //   })
  //   .then(res => {
  //     alert(res.data)
  //     navigate('/login')
  //   })

  //   setUsername("")
  //   setPassword("")
  // };


    const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        {
          username,
          password,
        }
      );

      alert(response.data);

      setUsername("");
      setPassword("");

      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Register
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Create your account
        </p>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;