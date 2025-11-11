import React, { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  );

  // Auto update time every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setCurrentDate(
        new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      );
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className="d-flex align-items-center justify-content-between px-3 py-2 shadow"
      style={{
        background:
          "linear-gradient(90deg, rgba(79,70,229,1) 0%, rgba(139,92,246,1) 50%, rgba(59,130,246,1) 100%)",
        color: "white",
      }}
    >
      <div className="d-flex align-items-center">
  <h4 className="fw-bold mb-0 text-white">POS</h4>
</div>

      {/* Center Section - Search Bar */}
      <div className="flex-grow-1 mx-5" style={{ maxWidth: "550px" }}>
        <div className="position-relative">
          <input
            type="text"
            placeholder="Search transactions, items, users..."
            className="form-control border-0 rounded-pill ps-5 py-2"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          />
          <FiSearch
            className="position-absolute"
            style={{ left: "15px", top: "10px", color: "rgba(255,255,255,0.8)" }}
          />
        </div>
      </div>

      {/* Right Section - Time, Notifications, User */}
      <div className="d-flex align-items-center gap-4">
        {/* Time & Date */}
        <div className="text-end">
          <p className="mb-0 fw-semibold">{currentTime}</p>
          <small className="opacity-75">{currentDate}</small>
        </div>

        {/* Notifications */}
        <div className="position-relative">
          <FaBell size={22} />
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.6rem" }}
          >
            3
          </span>
        </div>

        {/* User Info */}
        <div
          className="d-flex align-items-center gap-2 rounded-pill px-3 py-1"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", cursor: "pointer" }}
        >
          <FaUserCircle size={22} />
          <span className="fw-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
