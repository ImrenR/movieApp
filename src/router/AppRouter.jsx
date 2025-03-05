import React from 'react';
import Navbar from '../components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Main from '../pages/Main';
import PrivateRouter from './PrivateRouter';
import MovieDetail from '../pages/MovieDetail';
// to appear "toastContainer " in Browser we have done
//BrowserRouter wraps in index.js..

const AppRouter = () => {
  return (
  <>
  <Navbar/>
  <Routes>
    
    <Route  path='/' element={<Main/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
  
<Route path='/details/:id' element={<PrivateRouter/>}>
  <Route path='' element={<MovieDetail/>}/>
</Route>
  </Routes>
  
  </>
  )
}

export default AppRouter