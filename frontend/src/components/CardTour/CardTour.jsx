import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// MUI
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

const CardTour = ({ imageFile, description, title, _id, name }) => {
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
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
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

export default CardTour