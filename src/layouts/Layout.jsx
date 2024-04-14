import React from "react";
import Header from "../components/header";
import ListEmployees from "../pages/listEmployees";
import ViewEmployee from "../pages/viewEmployee";
import Sidebar from "../components/sidebar";
import ViewProfile from "../pages/personalView";
import AddEmployee from "../pages/addEmployee";
import ChangePasswordPage from "../pages/changePassword";

export const ListEmployeeLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', width: 'full' }}>
        <Sidebar />
        <ListEmployees />
      </div>
    </div>
  );
};

export const ChangePasswordLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', width: 'full' }}>
        <Sidebar />
        <ChangePasswordPage />
      </div>
    </div>
  );
};

export const ViewProfileLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', width: 'full' }}>
        <Sidebar />
        <ViewProfile />
      </div>
    </div>
  );
};

export const ViewEmployeeLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', width: 'full' }}>
        <Sidebar />
        <ViewEmployee />
      </div>
    </div>
  );
};

export const AddEmployeeLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', width: 'full' }}>
        <Sidebar />
        <AddEmployee />
      </div>
    </div>
  );
};


