import React, { useState, useEffect } from 'react';
// React Router 
import { useNavigate, useParams } from "react-router-dom";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { createTour } from '../redux/features/tourSlice';
// File Base
import FileBase from 'react-file-base64';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';

const initialState = {
    title: "",
    description: "",
};

const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error, loading} = useSelector((state) => ({ ...state.tour }));
  const { user } = useSelector((state) => ({ ...state.auth }))

  const { title, description } = tourData;

  useEffect(() => {
    error && console.log(error);
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if(title && description){
      const updatedTourData = {...tourData, name: user?.result?.name}

      dispatch(createTour({updatedTourData, navigate}));
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  return (
    <Grid container component="main" display='flex' alignItems='center' justifyContent='center' height='100vh'>
    <Grid item  component={Paper}>
      <Box p={5} textAlign='center'>
        <Typography component="h1" variant="h5">
          Create Tour
        </Typography>
        <form noValidate style={{ marginTop: '2rem'}} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            invalid
            value={title}
            name="title"
            label="Title"
            type="text"
            onChange={onInputChange}
          />
          <TextField
            multiline
            rows={5}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            invalid
            value={description}
            name="description"
            label="Description"
            type="text"
            onChange={onInputChange}
          />
          <Box textAlign='left' mt={2}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setTourData({ ...tourData, imageFile: base64 })} />          
          </Box>
          <Box mt={3} mb={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Create Tour
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  </Grid>
  )
}

export default AddEditTour