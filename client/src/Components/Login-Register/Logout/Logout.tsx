import React from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/slices/userSlice';

function Logout() {
    const dispatch = useDispatch();

    function logout() {
        dispatch(setUser({
            username: "",
            token: ""
        }))
    }


  return (
    <>
        <button onClick={logout}>Logout</button>
    </>
  )
}

export default Logout
