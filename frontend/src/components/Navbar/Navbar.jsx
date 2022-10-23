import React, { useState } from 'react';
// React Router
import { Link } from 'react-router-dom';
// MUI
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import MenuIcon from '@mui/icons-material/Menu';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/features/authSlice';

const Navbar = () => {
    const { user } = useSelector((state) => ({...state.auth}));
    const dispatch = useDispatch();

    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleLogout = () => {
      dispatch(setLogout());
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Link to='/' className='white-link'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <LocalAirportIcon />
          </IconButton>
        </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Made For Travelers
          </Typography>
          {user?.result?._id ? (
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
              <MenuItem onClick={handleCloseUserMenu}>
              <Box display='flex' flexDirection='column' p={1}>
               <Link to='/profile'>
                <Typography textAlign="left" color='black'>Profile</Typography>
               </Link>
               <Link to='/addTour'>
                <Typography textAlign="center" color='black' mt={1}>Add Tour</Typography>
               </Link>
               <Link to='/login'>
                <Typography textAlign="left" color='black' mt={1} onClick={handleLogout}>Logout</Typography>
               </Link>
              </Box>
              </MenuItem>

          </Menu>
          </Box>
          ) : (
            <Link to='/login' className='white-link'>
                <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar