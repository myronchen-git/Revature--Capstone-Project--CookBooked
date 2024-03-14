import React, { useState } from 'react'

function RegisterInput(props: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        props.createUser({username, password});
    }


  return (
    <>
        <p>Register:</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/><br/>
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/><br/>
            <button type="submit">Submit</button>
        </form>
        
    </>
  )
}

export default RegisterInput
