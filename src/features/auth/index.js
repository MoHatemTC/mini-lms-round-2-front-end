import authReducer from './authSlice';

export {
  setCredentials,
  clearCredentials,
  setLoading,
  setError
} from './authSlice';

export {
  selectUser,
  selectAccessToken,
  selectIsAuthenticated,
  selectLoading,
  selectError
} from './authSelectors';

export {
  login,
  refreshAccessToken,
  logout
} from './authThunks';

export default authReducer;
