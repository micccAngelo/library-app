import React from 'react';
import LoginForm from './components/LoginForm';
import Appbar from './components/Appbar'
import ListBook from './components/ListBook';
import BookDetail from './components/BookDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const handleLogin = (userId) => {
    console.log('User ID:', userId);
  };

  return (
    <Router>
      <Appbar/>
      <Routes>
        <Route path='/book' element={<ListBook />} />
        <Route path='/' element={<LoginForm onLogin={handleLogin} />}/>
        <Route path='/book/:id' element={<BookDetail/>} />
      </Routes>
    </Router>
   
  );
}

export default App;
