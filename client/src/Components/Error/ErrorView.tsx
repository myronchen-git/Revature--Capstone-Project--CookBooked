import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store';
import { setError } from '../../store/slices/errorSlice';
import './Error.css';

// <ErrorView message={"test"} isError={true} /> where message is the error text displayed

function ErrorComponent(props: any) {
    let errorMessage = useSelector((state: RootState) => state.error.message)
    let isError = useSelector((state: RootState) => state.error.isError)
    let dispatch = useDispatch();

    dispatch(setError(props))

  return (
    <div>
      {isError && <p className="error">Error: {errorMessage}</p>}
    </div>
  )
}

export default ErrorComponent
