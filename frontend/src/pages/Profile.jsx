import React, { useEffect } from 'react';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { deleteTour, getToursByUser } from '../redux/features/tourSlice';
// MUI
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const { user } = useSelector((state) => ({...state.auth}));
  const { userTours } = useSelector((state) => ({...state.tour}));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if(userId){
        dispatch(getToursByUser(userId));
    }
  }, [userId]);

  const handleDelete = (id) => {
    dispatch(deleteTour(id));
  }

  return (
    <Box>
        <Typography>
            Profile: {user?.result?.name}
        </Typography>

        <Box>
            <Typography>
                Your Posts
            </Typography>

            {userTours && userTours.map((item, index) => (
                   <Card sx={{ maxWidth: 345 }} key={index}>
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
                     title={item.title}
                     subheader={item.name}
                   />
                   <CardMedia
                     component="img"
                     height="194"
                     image={item.imageFile}
                     alt={item.title}
                   />
                   <CardContent>
                     <Typography variant="body2" color="text.secondary">
                       {item.description}
                     </Typography>
                   </CardContent>
                   <CardActions disableSpacing>
                   <Link to={`/editTour/${item._id}`}>
                    <IconButton aria-label="edit post">
                       <EditIcon />
                     </IconButton>
                    </Link>
                     <IconButton aria-label="delete post" onClick={() => handleDelete(item._id)}>
                       <DeleteIcon />
                     </IconButton>
                   </CardActions>
                 </Card>
            ))}
        </Box>
    </Box>
  )
}

export default Profile