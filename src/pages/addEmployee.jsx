import React from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { addEmployee } from "../redux/reducers/addEmployee";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string(),
  dateOfBirth: yup.date(),
  address: yup.string(),
  department: yup.string(),
  designation: yup.string(),
  dateOfJoining: yup.date(),
  empId: yup.string().required("Employee ID is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const AddEmployee = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address: "",
      department: "",
      designation: "",
      dateOfJoining: "",
      empId: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addEmployee(values));
      navigate(-1);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
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
                  <Select
                    label="Designation"
                    fullWidth
                    sx={{ margin: 2 }}
                    name="designation"
                    placeholder="Designation"
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // label="Date of Joining"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{ margin: 2 }}
                    name="dateOfJoining"
                    value={formik.values.dateOfJoining}
                    onChange={formik.handleChange}
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
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Button
          style={{ background: "#105369" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Grid>
    </form>
  );
};

export default AddEmployee;
