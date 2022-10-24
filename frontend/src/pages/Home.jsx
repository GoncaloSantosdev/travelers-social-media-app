import React, { useEffect } from 'react';
// Components
import CardTour from '../components/CardTour/CardTour';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { getTours } from '../redux/features/tourSlice';
// MUI
import { Box } from '@mui/material';


const Home = () => {
  const {tours} = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTours());
  }, []);

  return (
    <Box>
      {tours && tours.map((item, index) => (
        <Box key={index} pt={5}>
          <CardTour {...item}/>
        </Box>
      ))}
    </Box>
  )
}

export default Home