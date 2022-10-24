import React, { useState } from 'react';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// MUI
import { AppBar, Box, Button, IconButton, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../redux/features/authSlice';
import { searchTours } from '../../redux/features/tourSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: '1rem',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = () => {
    const { user } = useSelector((state) => ({...state.auth}));
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
      e.preventDefault();

      if(search){
        dispatch(searchTours(search));
        navigate(`/tours/search?searchQuery=${search}`);
      } else {
        navigate('/');
      }
    }

  return (
    <Box sx={{ flexGrow: 1 }} width={1}>
      <AppBar position="static">
        <Toolbar>
        <Box width='100%' display='flex' alignItems='center' justifyContent='space-between'>
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
        <form onSubmit={handleSubmit} style={{ minWidth: '40%' }}>
          <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Search>
        </form>
          {user?.result?._id ? (
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 3 }}>
              <AccountCircleIcon className='white-svg'/>
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
                <Typography textAlign="center" color='black' mt={1}>Add Post</Typography>
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
        </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar