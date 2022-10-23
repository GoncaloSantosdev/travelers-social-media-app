import React, { useState, useEffect } from 'react';
// React Router Dom
import { Link, useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/features/authSlice';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email && password){
      dispatch(login({formValue, navigate}))
    }
  };
  
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };


  return (
    <Grid container component="main" display='flex' alignItems='center' justifyContent='center' height='100vh'>
    <Grid item  component={Paper}>
      <Box p={5} textAlign='center'>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate style={{ marginTop: '2rem'}} onSubmit={handleSubmit}>
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
              Sign In
            </Button>
          </Box>

          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  </Grid>
  )
}

export default Login