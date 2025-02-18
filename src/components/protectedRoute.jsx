import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
 import { useDispatch } from "react-redux";
 import { getMe } from "../features/authSlice";
const ProtectedRoute = ({ children, requiredRole }) => {
  const dispatch = useDispatch();

    useEffect(()=>{
          
          dispatch(getMe());
      },[dispatch]);
    const { user } = useSelector((state) => state.auth);
 
    if (!user) {
        return <Navigate to="/" replace />; // Redirect to home if not logged in
    }
 
    if (user.role !== "admin" && user.role !== requiredRole) {
        return <Navigate to="/home" replace />; // Redirect to dashboard if unauthorized
    }
 
    return children;
};
 
export default ProtectedRoute;
 
 