import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import { loadState } from '../localStorage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = loadState("token");
    const user = loadState("user");
    
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    } else {
      navigate('/');
    }
  }, [dispatch, navigate]);

  if (!isAuthenticated) {
    const token = loadState("token");
    const user = loadState("user");
    
    if (!token || !user) {
      return null; // Will redirect in useEffect
    }
  }

  return children;
};

export default ProtectedRoute;