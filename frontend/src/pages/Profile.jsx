import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Profile Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#8B9A6E] flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-5">
          <h1 className="text-3xl font-bold text-[#2F3A25]">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back!
          </p>
        </div>

        {/* Username */}
        <div className="mt-8 bg-[#F7F2EB] rounded-lg p-4">
          <p className="text-sm text-gray-500">
            Username
          </p>

          <p className="text-lg font-semibold text-[#2F3A25] mt-1">
            {user?.username || "User"}
          </p>
        </div>

        {/* Password */}
        <div className="mt-4 bg-[#F7F2EB] rounded-lg p-4">
          <p className="text-sm text-gray-500">
            Password
          </p>

          <p className="text-lg font-semibold text-[#2F3A25] mt-1">
            ••••••••
          </p>
        </div>

        {/* Account Status */}
        <div className="mt-4 bg-[#F7F2EB] rounded-lg p-4">
          <p className="text-sm text-gray-500">
            Account Status
          </p>

          <p className="text-lg font-semibold text-[#8B9A6E] mt-1">
            Logged In
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-[#8B9A6E] text-white py-3 rounded-lg font-semibold hover:bg-[#75855B] transition duration-200"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;