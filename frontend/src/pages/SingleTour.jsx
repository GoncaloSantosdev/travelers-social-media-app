import React, { useEffect } from 'react';
// React Router
import { useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getTour } from '../redux/features/tourSlice';
// Moment
import moment from "moment";
// MUI
import { Box, Typography, Button } from '@mui/material';

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
    <Box>
        <Box>
            <Typography>
                {tour.title}
            </Typography>
        </Box>
        <Box>
            <Typography>
                {tour.name}
            </Typography>
        </Box>
        <Box>
            <Typography>
                {moment(tour?.createdAt).fromNow()}
            </Typography>
        </Box>
        <Box>
            <Typography>
                {tour.description}
            </Typography>
        </Box>
        <Box>
            <img width='100%' src={tour.imageFile} alt="" />
        </Box>
        <Box>
            <Box>
                <Typography>
                    Comments
                </Typography>

                <Button variant='contained'>
                    Comment
                </Button>
            </Box>
        </Box>
    </Box>
  )
}

export default SingleTour