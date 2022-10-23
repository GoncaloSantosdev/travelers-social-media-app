import React, { useEffect } from 'react';
// Pages
import { AddEditTour, Home, Login, Register, SingleTour } from './pages';
// React Router
import { Routes, Route } from 'react-router-dom'; 
// Components
import { Navbar } from './components';
// Redux
import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';

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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addTour' element={<AddEditTour />} />
        <Route path='/editTour/:id' element={<AddEditTour />} />
        <Route path='/tour/:id' element={<SingleTour />} />
      </Routes>
    </>
  );
}

export default App;
