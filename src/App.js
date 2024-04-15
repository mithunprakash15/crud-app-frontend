import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './assets/global.css';
import { store } from './redux/store';
import ListEmployees from './pages/listEmployees';
import { ListEmployeeLayout, ViewProfileLayout, ViewEmployeeLayout, AddEmployeeLayout, ChangePasswordLayout } from './layouts/Layout';
import Login from './pages/loginPage';

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login', { replace: true });
  //   }
  // }, [navigate]);

  return (
    <ReduxProvider store={store}>
      <Router> 
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
          <Route path="/list" element={<ListEmployeeLayout />} />
          <Route path="/:id" element={<ViewEmployeeLayout />} />
          <Route path="/add" element={<AddEmployeeLayout />} />
          <Route path="/view" element={<ViewProfileLayout />} />
          <Route path="/change" element={<ChangePasswordLayout />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer position="top-right" /> 
      </Router>
    </ReduxProvider>
  );
}

export default App;
