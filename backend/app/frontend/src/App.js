import React from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Register from './pages/Registration/Register'
import Login from './pages/Registration/Login'
import Header from './components/Header';
import PostProduct from './components/Product/PostProduct';
import Home from './pages/Home/Home';
import SingleProduct from './components/Product/SingleProduct';
import ThemeProvider from './Context/ThemeProvider';

function App() {
  return (
    <>
    <ThemeProvider>
    <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:productId' element={<SingleProduct />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/addProduct' element={<PostProduct />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ThemeProvider>
    </>
  );
}

export default App;
