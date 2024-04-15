import React, { useEffect } from "react";
import CustomizedTable from "../components/CustomTable";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux"; 
import {listEmployee} from "../redux/reducers/listEmployee";
import {deleteEmployee} from "../redux/reducers/deleteEmployee";
const ListEmployees = () => {
  const dispatch = useDispatch(); 
  const EmployeeData = useSelector((state) => state.ListEmployee.response); 
  const updateData = useSelector((state) => state.DeleteEmployee); 
  const updateAdd = useSelector((state) => state.AddEmployee); 

  const jwtToken = localStorage.getItem('jwt');
  useEffect(() => {
 
    dispatch(listEmployee());

  }, [updateData, updateAdd]); 


  useEffect(() => {
 
    dispatch(listEmployee());
  }, []); 


  const employeeData = [
    {
      name: "John Doe",
      designation: "Software Engineer",
      dateOfJoining: "2022-01-15",
    },
    {
      name: "Jane Smith",
      designation: "UI/UX Designer",
      dateOfJoining: "2021-11-30",
    },
    {
      name: "Michael Johnson",
      designation: "Product Manager",
      dateOfJoining: "2020-09-25",
    },
    {
      name: "Emily Brown",
      designation: "Marketing Analyst",
      dateOfJoining: "2023-03-10",
    },
    {
      name: "David Wilson",
      designation: "Sales Executive",
      dateOfJoining: "2021-06-18",
    },
  ];
  
  const filterData = Array.isArray(EmployeeData) ? EmployeeData.map((e, index) => {
    return {
      ID: e.empId,
      Name: <Link to={`/${e.empId}`}>{e.firstName}</Link>,
      Designation: e.designation ?? '-',
      DOJ: e.doj?? '-',
      Actions: <div> <p style={{ color: 'red', cursor: 'pointer' }} onClick={()=>{ dispatch(deleteEmployee(e.empId))}}>Delete</p></div>,
    };
  }) : null;
  

  return  <div style={{ padding: '1rem', justifyContent: 'center', marginLeft: '2rem', width: '100%' }}>
     <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '6px' }}>
        <Button style={{ background: '#105369' }} variant="contained" color="primary"><Link to={`/add`}>Add</Link></Button>
      </div>
      {filterData !== null &&     <CustomizedTable rows={filterData} />}

  </div>;
};

export default ListEmployees;
