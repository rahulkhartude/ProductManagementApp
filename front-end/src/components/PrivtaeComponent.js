import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

export const PrivtaeComponent = () => {
    const isAuth = localStorage.getItem("user");
  return (
    isAuth?
    <Outlet />: <Navigate to="/signup" />
  )
}
