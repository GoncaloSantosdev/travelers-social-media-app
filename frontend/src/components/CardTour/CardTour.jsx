import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { likeTour } from '../../redux/features/tourSlice';
// MUI
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
          R
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={title}
      subheader={name}
    />
    <CardMedia
      component="img"
      height="194"
      image={imageFile}
      alt={title}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="like post" onClick={handleClick}>
        <ThumbUpIcon />
        <Typography>{likes.length}</Typography>
      </IconButton>
    <Link to={`/tour/${_id}`}>
      <Button variant='contained'>
            View More
      </Button>
    </Link>
    </CardActions>
  </Card>
  )
}

export default CardTour;