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
import PersonIcon from '@mui/icons-material/Person';

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
    <Box mt={6}>
        <Typography variant="h5" component="h2" textAlign='center'>
            Profile: {user?.result?.name}
        </Typography>
        <Box mt={6}>
            <Typography variant="h6" component="h3" textAlign='left'>
                Your Posts
            </Typography>
          <Box width={1} display='flex' justifyContent='space-between' flexWrap='wrap'> 
            {userTours && userTours.map((item, index) => (
              <Box pt={3}>
                   <Card sx={{ maxWidth: 345 }} key={index}>
                   <CardHeader
                     avatar={
                       <Avatar aria-label="recipe">
                         <PersonIcon />
                       </Avatar>
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
                </Box>
            ))}
            </Box>
        </Box>
    </Box>
  )
}

export default Profile