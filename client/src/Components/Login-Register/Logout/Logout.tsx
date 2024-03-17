import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/slices/userSlice';
import { useLocalStorage } from '../useLocalStorage';

function Logout() {
    const dispatch = useDispatch();
    const { removeItem } = useLocalStorage('user');

    function logout() {
        dispatch(setUser({
            username: "",
            token: ""
        }))
        removeItem();
    }


  return (
    <>
        <button onClick={logout}>Logout</button>
    </>
  )
}

export default Logout
