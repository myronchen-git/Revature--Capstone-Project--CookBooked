import React, { useState } from 'react'
import RegisterInput from './RegisterInput'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ErrorView from '../../Error/ErrorView';

const URL = `http://localhost:4000/accounts`;

function RegisterContainer() {
    let dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    async function createUser(user: any) {
        try {
            let response = await axios.post(URL, {
                username: user.username,
                password: user.password,
            });
            if (response.status == 201) {
                setSuccess(true);
                setIsError(false);
            }
            console.log(response);
            return response;
        } catch (err) {
            setIsError(true);
            console.log(err);
        }
    }   

  return (
    <>
        {!success && <RegisterInput createUser={createUser} />}
        {success && <p>Account creation successful, you may now login with your credentials</p>}
        {isError && <ErrorView message={'Account creation failed, please try again with different credentials'} isError={true} />}
    </>
  )
}

export default RegisterContainer
