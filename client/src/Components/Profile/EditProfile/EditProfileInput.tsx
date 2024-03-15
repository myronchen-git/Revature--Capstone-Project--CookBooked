import React, { useState } from 'react'

function EditProfileInput(props: any) {
    const [aboutMeInput, setAboutMeInput] = useState("");
    const [imageUrlInput, setImageUrlInput] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        props.updateProfile('aboutMe', aboutMeInput);
        props.setShowEditProfile(false);
    }


  return (
    <>
        <p>Edit Profile:</p><br></br>
        <form onSubmit={handleSubmit}>
            <label htmlFor="aboutMe">About Me</label><br></br>
            <textarea id="aboutMe" name="aboutMe" defaultValue={props.aboutMe} readOnly={false} rows={4} cols={50} onChange={(e) => setAboutMeInput(e.target.value)}></textarea><br></br>      
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default EditProfileInput
