import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");

    // console.log("object");
    navigate("/");
  };

  const jwtToken = localStorage.getItem('jwt');
  const decodedToken = jwtDecode(jwtToken);


  return (
    <div>
      <div className="sidebar">
        <div>CRUD Dashboard</div>
        <div style={{display:'flex'}}> 
        <div style={{marginRight:'15px'}}>
          Hi,{decodedToken.name}
        </div>
     
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
    </div>
  );
};

export default Header;
