import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {

  const navigate = useNavigate();

  const role = sessionStorage.getItem("ROLE");

  const activeStyle = "text-blue-400 font-semibold border-b-2 border-blue-400";
  const normalStyle = "hover:text-blue-300";

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.log("Logout Unsuccessfull" + e)
    }

    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="flex justify-between p-4 bg-gray-900 text-white">

      <NavLink to="/" className="text-3xl font-extrabold tracking-wide text-white-600">
        Used Car
      </NavLink>

      <div className="flex gap-6 items-center">

        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? activeStyle : normalStyle}
        >
          Home
        </NavLink>

        {role === "ADMIN" && (
          <NavLink
            to="/admin"
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Admin
          </NavLink>
        )}

        {!role && (
          <NavLink
            to="/login"
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Login
          </NavLink>
        )}

        {role && (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
}