import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import './App.css';

export const App = () => {
  const isLoggedIn = localStorage.getItem('auth') === 'true';

  return (
    <div className='app'>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
