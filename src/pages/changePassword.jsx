import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../redux/reducers/changePassword';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ChangePasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   

  const updateData = useSelector((state) => state.ChangePassword); 

 

  const formik = useFormik({
    initialValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
        currentPassword: Yup.string()
        .required('Required'),
      newPassword: Yup.string()
        .required('Required')
        .min(8, 'Password must be at least 8 characters')
    }),
    onSubmit: values => {
      dispatch(changePassword(values));
      navigate(-1) 
    },
  });

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email ID"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="currentPassword"
            name="currentPassword"
            label="Old Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('currentPassword')}
            error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
          <TextField
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...formik.getFieldProps('newPassword')}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              style={{ background: '#105369' }} 
            >
              Change Password
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePasswordPage;
