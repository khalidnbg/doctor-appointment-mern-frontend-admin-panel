import { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/adimin/Dashboard";
import AddDoctor from "./pages/adimin/AddDoctor";
import AllAppointments from "./pages/adimin/AllAppointments";
import DoctorsList from "./pages/adimin/DoctorsList";

function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointment" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />

      <ToastContainer />
    </>
  );
}

export default App;
