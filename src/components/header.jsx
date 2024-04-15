import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");

    // console.log("object");
    navigate("/");
  };

  return (
    <div>
      <div className="sidebar">
        <div>CRUD Dashboard</div>
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            handleLogout();
            // navigate('/login')
          }}
        >
          <LogoutIcon fontSize="small" />
          <p style={{ marginLeft: "3px " }}>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
