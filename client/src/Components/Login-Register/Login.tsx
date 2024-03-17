import React from 'react'
import LoginContainer from './Login/LoginContainer'
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import ErrorView from '../Error/ErrorView';
import RegisterContainer from './Register/RegisterContainer';
import './Login.css';
import Logout from './Logout/Logout';

function Login() {
  let username = useSelector((state: RootState) => state.user.username);
  // let token = useSelector((state: RootState) => state.user.token);

  return (
    <>
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
    
    </>
  )
}

export default Login
