import React, { useState } from 'react';
import LoginInput from './LoginInput';
import axios from 'axios';

const URL = ``;

function LoginContainer() {
    const [user, setUser] = useState({} as any);

    async function updateUser(user: any) {
        try {
            let response: any = await getUser(user);
            setUser(response.data);
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

            return response;
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>
        <LoginInput updateUser={updateUser}/>
        <p>{user.username}</p>
    </>
  )
}

export default LoginContainer;
