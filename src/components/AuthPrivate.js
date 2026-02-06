import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const AuthPrivate = () => {

    const { currentUser } = useSelector((state) => state.user);

    return currentUser?._id ? <Outlet /> : <Navigate to="/signin" />;
  
}

export default AuthPrivate