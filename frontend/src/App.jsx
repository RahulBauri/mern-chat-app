import React from 'react';
import { Toaster } from 'react-hot-toast';
import Login from './pages/login/Login';

import Home from './pages/home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import SignUp from './pages/signup/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

const App = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
};

export default App;
