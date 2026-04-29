import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars/:id" element={<CarDetails />} />

        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />
      </Routes>
    </>
  );
}

export default App;