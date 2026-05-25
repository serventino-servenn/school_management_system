import { Navigate, Outlet } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // Optional: Use if decoding from token

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Get role from localStorage or decode it from the JWT token
    const userRole = localStorage.getItem('role'); 
    
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
