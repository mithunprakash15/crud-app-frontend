import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import {addEmployee} from "../redux/reducers/addEmployee";
import {viewEmployee} from "../redux/reducers/viewEmployee";
import {updateEmployee} from "../redux/reducers/updateEmployee";
import { jwtDecode } from "jwt-decode";
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string(),
  dateOfBirth: yup.date(),
  address: yup.string(),
  department: yup.string(),
  designation: yup.string(),
  dateOfJoining: yup.date(),
  empId: yup.string().required("Employee ID is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
});

const ViewEmployee = () => {



  const [editMode, setEditMode] = useState(false);


  const dispatch = useDispatch(); 
  const navigate = useNavigate();

const jwtToken = localStorage.getItem('jwt');
const decodedToken = jwtDecode(jwtToken);
console.log(decodedToken)

  useEffect(() => {
 
    dispatch(viewEmployee(decodedToken.userId));
  }, [decodedToken]); 

  const EmployeeData = useSelector((state) => state.ViewEmployee.response); 

  console.log("1",EmployeeData)



  const formik = useFormik({
    initialValues: {
      firstName: EmployeeData.firstName ?? "",
      lastName: EmployeeData.lastName ?? "",
      dateOfBirth: EmployeeData.dob ??  "",
      address: EmployeeData.address ??  "",
      designation: EmployeeData.designation ??  "",
      dateOfJoining:  EmployeeData.doj ?? "",
      empId:  EmployeeData.empId ?? "",
      email: EmployeeData.email ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      console.log(values);
      dispatch(updateEmployee(values))
      setEditMode(false)
      navigate(-1)      
    },
  });

  useEffect(() => {
    // if (EmployeeData) {
    //   formik.setValues({
    //     firstName: EmployeeData.firstName || "",
    //     lastName: EmployeeData.lastName || "",
    //     dateOfBirth: EmployeeData.dob || "",
    //     address: EmployeeData.address || "",
    //     designation: EmployeeData.designation || "",
    //     dateOfJoining: EmployeeData.doj || "",
    //     empId: EmployeeData.empId || "",
    //     email: EmployeeData.email || "",
    //   });
    // }
  }, [EmployeeData]);

  console.log("values",formik.values)
  const handleEditClick = () => {
    setEditMode(true);
  };


  return (
    <form onSubmit={formik.handleSubmit}>
      {!editMode &&
       <Grid container justifyContent="end">
       <Button style={{ background: '#105369', marginTop:'10px' }} variant="contained" color="primary" onClick={handleEditClick}>Edit</Button>
     </Grid>
      }
      
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} sm={8}>
          <Card sx={{ padding: 2, margin: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "semi-bold", fontSize: "1.2rem" }}
            >
              Personal Details
            </Typography>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="First Name"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        required
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        disabled={!editMode} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Last Name"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        disabled={!editMode} 
                      
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ marginBottom: 2 }}
                    name="dateOfBirth"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    disabled={!editMode} 
                  />
                </Grid>
               
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    disabled={!editMode} 
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card sx={{ padding: 2, margin: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "semi-bold", fontSize: "1.2rem" }}
            >
              Professional Details
            </Typography>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Designation"
                    fullWidth
                    sx={{ margin: 2 }}
                    name="designation"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    disabled={!editMode} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date of Joining"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ margin: 2 }}
                    name="dateOfJoining"
                    value={formik.values.dateOfJoining}
                    onChange={formik.handleChange}
                    disabled={!editMode} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Employee ID"
                    fullWidth
                    sx={{ margin: 2 }}
                    name="empId"
                    value={formik.values.empId}
                    onChange={formik.handleChange}
                    error={formik.touched.empId && Boolean(formik.errors.empId)}
                    helperText={formik.touched.empId && formik.errors.empId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    sx={{ margin: 2 }}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      { editMode &&
      <Grid container justifyContent="center">
        <Button style={{ background: '#105369' }} type="submit" variant="contained" color="primary">Submit</Button>
      </Grid>
      }
    </form>
  );
};

export default ViewEmployee;
