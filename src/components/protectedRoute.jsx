import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
 import { useDispatch } from "react-redux";
 import { getMe } from "../features/authSlice";
 import { useState } from "react";
const ProtectedRoute = ({ children, requiredRole }) => {
  const dispatch = useDispatch();
  const [checkedAuth, setCheckedAuth] = useState(false); // <-- local control
  const { user } = useSelector((state) => state.auth);


    useEffect(()=>{
      checkAuth();
          // dispatch(getMe());
      },[dispatch]);

      const checkAuth = async () => {
        try {
          await dispatch(getMe()).unwrap(); // waits until getMe finishes
        } catch (error) {
          console.log("Auth check failed:", error);
        } finally {
          setCheckedAuth(true); // finished dispatching, even if error
        }
      }
    if(!checkedAuth){
      return null
    }
    if (!user) {
        return <Navigate to="/" replace />; // Redirect to home if not logged in
    }
 
    if (user.role !== "admin" && user.role !== requiredRole) {
        return <Navigate to="/home" replace />; // Redirect to dashboard if unauthorized
    }
 
    return children;
};
 
export default ProtectedRoute;
 
 