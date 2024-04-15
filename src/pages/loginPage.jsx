import React, { useEffect, useState } from "react";
import { Card, CardContent, TextField, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../redux/reducers/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const data = useSelector((state) => state.AuthLogin);
  const jwtToken = localStorage.getItem('jwt');
  
  console.log("data", data);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLogin(formData))
      
  };

  useEffect(() => {
    if (data.isSuccess && jwtToken) {
      console.log(jwtToken)
      navigate("/list");
    }
  }, [data]);

  return (
    <div className="backgroundTheme">
      <div
        style={{
          background: "linear-gradient(to right, #1c687e, #105369)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "#f0f0f0",
            width: "500px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "full",
              borderRadius: "10px",
              background: "linear-gradient(to right, #1c687e, #105369)",
              color: "#fff",
              padding: "8px",
            }}
          >
            <h2>Login</h2>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Grid container justifyContent="center">
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      background: "#105369",
                      marginTop: "16px",
                    }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
