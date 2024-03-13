import React, { useState } from 'react';

function LoginInput(props: any) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        props.updateUser({username, password}); // redux?
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/><br/>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/><br/><br/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default LoginInput;
