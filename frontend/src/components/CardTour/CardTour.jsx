import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { likeTour } from '../../redux/features/tourSlice';
// MUI
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';

const CardTour = ({ imageFile, description, title, _id, name, likes }) => {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => ({...state.auth}));
  const userId = user?.result?._id;

  const handleClick = () => {
    dispatch(likeTour({_id}));
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardHeader
      avatar={
        <Avatar aria-label="recipe">
          <PersonIcon />
        </Avatar>
      }
      title={title}
      subheader={name}
    />
    <CardMedia
      component="img"
      height="300"
      image={imageFile}
      alt={title}
    />

    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>

      <CardActions disableSpacing>
    <Box width={1} display='flex' justifyContent='space-between'>
        <IconButton aria-label="like post" onClick={handleClick}>
          <ThumbUpIcon />
          <Typography ml={1}>{likes.length}</Typography>
        </IconButton>
        <Box>
      <Link to={`/tour/${_id}`}>
        <Button variant='contained'>
              View More
        </Button>
      </Link>
        </Box>
    </Box>
      </CardActions>
  </Card>
  )
}

export default CardTour;