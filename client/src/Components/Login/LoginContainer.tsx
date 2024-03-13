import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/userSlice';
import LoginInput from './LoginInput';
import axios from 'axios';

const URL = `http://localhost:4000/accounts`;

function LoginContainer() {
    let dispatch = useDispatch();

    async function updateUser(user: any) {
        try {
            let response: any = await getUser(user);
            dispatch(setUser(response.data))
        } catch (err) {
            console.error(err)
        }
    }

    async function getUser(user:any) {
        try {
            // axios request here
            let response = await axios.post(`${URL}/auth`, {
                username: user.username,
                password: user.password
            });
            console.log(response);
            return response;
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>
        <LoginInput updateUser={updateUser}/>
    </>
  )
}

export default LoginContainer;
