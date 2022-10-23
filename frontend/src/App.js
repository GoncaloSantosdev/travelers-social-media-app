import React, { useEffect } from 'react';
// Pages
import { Home, Login, Register } from './pages';
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
      </Routes>
    </>
  );
}

export default App;