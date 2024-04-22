import React, { useEffect } from "react";
import CustomizedTable from "../components/CustomTable";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux"; 
import {listEmployee} from "../redux/reducers/listEmployee";
import {deleteEmployee} from "../redux/reducers/deleteEmployee";
import { jwtDecode } from "jwt-decode";

const ListEmployees = () => {
  const dispatch = useDispatch(); 
  const EmployeeData = useSelector((state) => state.ListEmployee.response); 
  const updateData = useSelector((state) => state.DeleteEmployee); 
  const updateAdd = useSelector((state) => state.AddEmployee); 

  const jwtToken = localStorage.getItem('jwt');
  const decodedToken = jwtDecode(jwtToken);

  console.log("dec",decodedToken)
  useEffect(() => {
 
    dispatch(listEmployee());

  }, [updateData, updateAdd]); 


  useEffect(() => {
 
    dispatch(listEmployee());
  }, []); 



  
  const filterData = Array.isArray(EmployeeData) ? EmployeeData.filter(e => e.designation !== 'Admin').map((e, index) => {
    return {
      ID: e.empId,
      Name: <Link to={`/${e.empId}`}>{e.firstName}</Link>,
      Designation: e.designation ?? '-',
      DOJ: e.doj?? '-',
      Actions: (decodedToken.designation === 'manager' && e.designation === 'manager' )? '' : <div> <p style={{ color: 'red', cursor: 'pointer' }} onClick={()=>{ dispatch(deleteEmployee(e.empId))}}>Delete</p></div>,
    };
  }) : null;

  const filterEmployeeData = Array.isArray(EmployeeData) ? EmployeeData.map((e, index) => {
    return {
      ID: e.empId,
      Name: <Link to={`/${e.empId}`}>{e.firstName}</Link>,
      Designation: e.designation ?? '-',
      DOJ: e.doj?? '-',
      // Actions: e.designation !== 'Admin' && e.designation !== 'Manager' ? <div> <p style={{ color: 'red', cursor: 'pointer' }} onClick={()=>{ dispatch(deleteEmployee(e.empId))}}>Delete</p></div> : '',
    };
  }) : null;
  

  return  <div style={{ padding: '1rem', justifyContent: 'center', marginLeft: '2rem', width: '100%' }}>
     <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '6px' }}>
      {decodedToken.designation !== 'employee' &&
      <Button style={{ background: '#105369' }} variant="contained" color="primary"><Link to={`/add`}>Add</Link></Button>
       }
        
      </div>
      {filterData !== null &&     <CustomizedTable rows={decodedToken.designation === 'employee' ? filterEmployeeData : filterData} />}

  </div>;
};

export default ListEmployees;
