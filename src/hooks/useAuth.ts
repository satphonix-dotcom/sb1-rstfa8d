import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginSuccess, loginFailure } from '../store/slices/authSlice';
import { getCurrentUser } from '../services/auth.service';
import { getLocalStorage } from '../utils/storage';
import { config } from '../config';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      const token = getLocalStorage(config.auth.tokenKey);
      if (token) {
        try {
          const user = await getCurrentUser();
          dispatch(loginSuccess({ token, user }));
        } catch (error) {
          dispatch(loginFailure(error instanceof Error ? error.message : 'Authentication failed'));
        }
      }
    };

    if (!isAuthenticated && !loading) {
      initAuth();
    }
  }, [dispatch, isAuthenticated, loading]);

  return { isAuthenticated, user, loading };
};