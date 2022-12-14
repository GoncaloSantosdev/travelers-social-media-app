import React, { useEffect } from 'react';
// Pages
import { AddEditTour, Home, Login, Profile, Register, SingleTour } from './pages';
// React Router
import { Routes, Route } from 'react-router-dom'; 
// Components
import { Footer, Navbar } from './components';
// Redux
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import { Container } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  // Refresh page and still get the user
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours/search' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addTour' element={<AddEditTour />} />
          <Route path='/editTour/:id' element={<AddEditTour />} />
          <Route path='/tour/:id' element={<SingleTour />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
