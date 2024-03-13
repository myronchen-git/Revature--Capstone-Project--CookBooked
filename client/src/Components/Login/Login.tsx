import React from 'react'
import LoginContainer from './LoginContainer'
import { AppDispatch, RootState } from '../../store/store';
import { useSelector } from 'react-redux';

function Login() {
  let username = useSelector((state: RootState) => state.user.username);
  let token = useSelector((state: RootState) => state.user.token);

  return (
    <>
      {!username && <LoginContainer />}
      {username && <p>Welcome, {username}</p>}<br></br>
    </>
  )
}

export default Login
