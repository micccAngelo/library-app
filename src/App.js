import React, { useState, useEffect } from "react";
import LoginForm from './components/LoginForm';
import Appbar from './components/Appbar'
import ListBook from './components/ListBook';
import BookDetail from './components/BookDetail';
import Cart from './components/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user_id) => {
    localStorage.setItem('user_id', user_id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Appbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/book' element={<ListBook />} />
        <Route path='/' element={<LoginForm onLogin={handleLogin} />}/>
        <Route path='/book/:id' element={<BookDetail />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
   
  );
}

export default App;
