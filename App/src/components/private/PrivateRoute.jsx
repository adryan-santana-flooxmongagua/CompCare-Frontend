import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token') // pode ser melhorado depois com contexto

  return isAuthenticated ? children : <Navigate to="/login" />
}

export default PrivateRoute
