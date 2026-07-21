import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from '../store/authThunks';
import { selectIsAuthenticated } from '../store/authSelectors';

export const useAuthInit = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const didInit = useRef(false);

  useEffect(() => {
    // The browser automatically sends HttpOnly cookies.
    // We dispatch the refresh action on app load to restore the session.
    // Avoid dispatching refresh if authentication has already been restored
    // or if we already attempted initialization.
    if (!isAuthenticated && !didInit.current) {
      didInit.current = true;
      // dispatch(refreshAccessToken());
    }
  }, [dispatch, isAuthenticated]);
};
