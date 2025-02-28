import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from './theme/theme.tsx';
import * as Mui from '@mui/material';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
// import Dashboard from './pages/dashboard.tsx';
import Users from './pages/users.tsx';
import Login from './pages/login.tsx';
import AddUser from "./pages/adduser.tsx";
// import * as Api from "./api";

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element } : any) => {
  const isAuthenticated = localStorage.getItem("token"); // Assuming token is stored
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <>
    <Route path='login' element={<Login/>}/>
    {/* <Route path="register" element={<SignUp />} /> */}
    <Route path='/' element={<App/>}>
      {/* <Route path='' element={<ProtectedRoute element={<Dashboard />}  />}/> */}
      <Route path='' element={<ProtectedRoute element={<AddUser />}  />}/>
      <Route path='users' element={<ProtectedRoute element={<Users />}  />}/>
     {/* Default to login page */}
     <Route path="*" element={<Navigate to="/login" />} />

    </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Api.Server.Main> */}
    <Mui.ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </Mui.ThemeProvider>
    {/* </Api.Server.Main> */}
  </React.StrictMode>,
)
