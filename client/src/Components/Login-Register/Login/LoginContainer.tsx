import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice';
import LoginInput from './LoginInput';
import axios from 'axios';
import { useLocalStorage } from '../useLocalStorage';
import ErrorView from '../../Error/ErrorView';
import { serverUrl } from '../../Util/constants'; 

function LoginContainer() {
    let dispatch = useDispatch();
    const { setItem } = useLocalStorage('user');
    const [isError, setIsError] = useState(false);

    async function updateUser(user: any) {
        try {
            let response: any = await getUser(user);
            dispatch(setUser(response.data))
            setItem(response.data);
            setIsError(false);
        } catch (err) {
            setIsError(true);
            console.error(err)
        }
    }

    async function getUser(user:any) {
        try {
            // axios request here
            let response = await axios.post(`${serverUrl}/accounts/auth`, {
                username: user.username,
                password: user.password
            });
            return response;
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>   
        <LoginInput updateUser={updateUser}/>
        {isError && <ErrorView message={'Login failed, please try again'} isError={true}/>}
    </>
  )
}

export default LoginContainer;
