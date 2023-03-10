import React, { useState, useEffect } from "react";
import LoginForm from './components/LoginForm';
import Appbar from './components/Appbar'
import ListBook from './components/ListBook';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (user_id) => {
    localStorage.setItem('user_id', user_id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setIsLoggedIn(true);
    }
    else{
      navigate('/login');
    }
  }, [navigate]);

  const isLoginPage = window.location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Appbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={<Navigate to='/book' />} />
        <Route path='/book' element={<ListBook />} />
        <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
        <Route path='/book/:id' element={<BookDetail />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
