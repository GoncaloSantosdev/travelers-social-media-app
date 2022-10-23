import React, { useState } from 'react';
// React Router
import { Link, useNavigate } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { register } from '../redux/features/authSlice';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password, firstName, lastName } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && firstName && lastName) {
      dispatch(register({ formValue, navigate }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <Grid container component="main" display='flex' alignItems='center' justifyContent='center' height='100vh'>
    <Grid item component={Paper}>
      <Box p={5} textAlign='center'>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form noValidate style={{ marginTop: '2rem'}} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="firstName"
            label="First Name"
            type="text"
            value={firstName}
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="lastName"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={onInputChange}
          />
          <Box mt={3} mb={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Box>

          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  </Grid>
  )
}

export default Register