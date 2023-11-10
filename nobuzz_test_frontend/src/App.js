import React from 'react';
import { createBrowserRouter, RouterProvider, Route, Routes, redirect, Navigate} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Sidebar from './pages/Sidebar';
import Task from './pages/Task';
import { useSelector } from 'react-redux';

 

function App() {

  const currentUser = useSelector(state=>state.user)

  return (

      <div style={{display:'flex', width:'100vw'}}>
        <Sidebar /> 
          <div style={{display: 'flex', margin:'auto', width:'85%', height:'100%' ,}}>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              {currentUser?.id ? (
                <Route path='/task/*' element={<Task />} />
              ) : (
                <Route path='*' element={<Navigate to='/login' replace />} />
              )}
          </Routes>
          </div>
      </div> 

    );
}

export default App;
