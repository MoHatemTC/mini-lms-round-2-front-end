import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/authThunks';
import { selectLoading, selectError } from '../../../store/authSelectors';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleLogout = async () => {
    const resultAction = await dispatch(logout());
    
    if (logout.fulfilled.match(resultAction)) {
      // Redux state is already cleared via extraReducers.
      // Redirect after successful logout
      navigate('/login');
    }
  };

  return (
    <div className="logout-container">
      <button 
        onClick={handleLogout} 
        disabled={loading} 
        className="logout-button"
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LogoutButton;
