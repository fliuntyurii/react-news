import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import { RootState } from './store/store';
import './App.css';

export const App = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className='app'>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/react-news" element={<Home />} />
          <Route path="/react-news/news" element={<News />} />
          <Route path="/react-news/login" element={<Login />} />
          <Route path="/react-news/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/react-news" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
