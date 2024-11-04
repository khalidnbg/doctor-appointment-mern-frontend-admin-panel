import { useContext } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";

function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9D]">
      <Navbar />
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
