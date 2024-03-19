import React, { useEffect } from 'react'
import LoginContainer from './Login/LoginContainer'
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import RegisterContainer from './Register/RegisterContainer';
import './Login.css';
import Logout from './Logout/Logout';
import { useLocalStorage } from './useLocalStorage';
import { setUser } from '../../store/slices/userSlice';

function Login() {
  let username = useSelector((state: RootState) => state.user.username);
  let dispatch = useDispatch();
  const { getItem } = useLocalStorage('user');

  useEffect(() => {
    let user = getItem();
    if (user) {
      dispatch(setUser(user))
    }
  }, [])

  return (
    <div className="loginPageContainer">
      <div className="login">
        {!username && <LoginContainer />}
        {username && <p>Welcome, {username}</p>}<br></br>
      </div>
      <div className='register'>
        {!username && <RegisterContainer />}
      </div>
      <div className='logout'>
        {username && <Logout />}
      </div>
    
    </div>
  )
}

export default Login
