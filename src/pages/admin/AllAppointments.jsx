import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../../../admin/src/assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto my-5">
      <p className="mb-3 text-lg font-semibold text-gray-700">
        All Appointments
      </p>

      <div className="bg-white border rounded shadow text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b bg-gray-50 text-gray-700 font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments list */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center gap-4 text-gray-600 py-3 px-3 border-b hover:bg-gray-50"
            >
              {/* Index */}
              <p className="max-sm:hidden">{index + 1}</p>

              {/* Patient info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.userData.image || "/default-user.png"}
                  alt="Patient"
                  className="rounded-full w-8 h-8 object-cover"
                />
                <p className="truncate">{item.userData.name}</p>
              </div>

              {/* Patient age */}
              <p className="max-sm:hidden">
                {item.userData.dob ? calculateAge(item.userData.dob) : "N/A"}
              </p>

              {/* Date & Time */}
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>

              {/* Doctor info */}
              <div className="flex items-center gap-3">
                <img
                  src={item.docData.image || "/default-doctor.png"}
                  alt="Doctor"
                  className="rounded-full w-8 h-8 object-cover bg-gray-200"
                />
                <p className="truncate">{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p>
                {currency}
                {item.amount}
              </p>

              {/* cancel btn */}
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium ">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-10 cursor-pointer"
                  onClick={() => cancelAppointment(item._id)}
                />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No appointments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
