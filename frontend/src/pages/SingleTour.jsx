import React, { useEffect } from 'react';
// React Router
import { useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getTour } from '../redux/features/tourSlice';
// Moment
import moment from "moment";
// MUI
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// Disqus 
import DisqusThread from '../components/DisqusThread/DisqusThread';

const SingleTour = () => {
  const dispatch = useDispatch();
  const {tour} = useSelector((state) => ({ ...state.tour }));
  const {id} = useParams();

  useEffect(() => {
    if(id){
        dispatch(getTour(id));
    }
  }, [dispatch, id]);

  return (
    <Box mt={5}>
        <Box>
            <Typography variant="h5" component="h2">
                {tour.title}
            </Typography>
        </Box>
        <Box mt={3}>
            <Typography>
                Description: {tour.description}
            </Typography>
        </Box>
 
        <Box mt={3}>
            <img width='100%' src={tour.imageFile} alt=""/>
        </Box>

        <Box display='flex' alignItems='center' justifyContent='space-between' mt={3}>
            <Box display='flex' alignItems='center'>
                <AccountCircleIcon /> 
                <Typography ml={1}>
                    {tour.name}
                </Typography>
            </Box>
            <Box display='flex' alignItems='center'>
                <CalendarMonthIcon/>
                <Typography ml={1}>
                    {moment(tour?.createdAt).fromNow()}
                </Typography>
            </Box>
        </Box>
        <Box mt={5}>
            <Box>
                <DisqusThread id={id} title={tour.title} path={`/tour/${id}`}/>
            </Box>
        </Box>
    </Box>
  )
}

export default SingleTour