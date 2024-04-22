import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const highlightStyle = {
    fontWeight: '500',
    color:'white',
    backgroundColor: '#105369', 
    width:'full',
    padding:'10px',
    textAlign: 'center', 
    borderRadius:'10px',
    cursor: 'pointer', 
  };
  const linkStyle = {
    width: 'full',
    padding: '10px',
    borderRadius: '10px',
   
    textAlign: 'center', 
    cursor: 'pointer', 
  };

  const handleListEmployeeClick = () => {
    navigate('/');
  };

  const handleViewProfileClick = () => {
    navigate('/view');
  };

  return (
    <div className="content">
      <p
        style={location.pathname === '/' || (location.pathname.slice(0, 9) !== '/view' && location.pathname.slice(0, 9) !== '/change') ? highlightStyle : linkStyle }
        onClick={handleListEmployeeClick}
      >
        List Employee
      </p>
      <p
        style={location.pathname === '/view' ? highlightStyle : linkStyle }
        onClick={handleViewProfileClick}
      >
        View Profile
      </p>

      <p
        style={location.pathname === '/change' ? highlightStyle : linkStyle }
        onClick={()=>{navigate('/change');}}
      >
        Change Password
      </p>

    </div>
  );
};

export default Sidebar;
