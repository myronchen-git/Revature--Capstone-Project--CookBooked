import React, { useState } from 'react'
import './EditProfile.css';

function EditProfileInput(props: any) {
    const [aboutMeInput, setAboutMeInput] = useState("");
    const [imageUrlInput, setImageUrlInput] = useState("");

    function handleSubmit(event: any) {
        event.preventDefault();
        props.updateProfile('aboutMe', aboutMeInput);
        props.setShowEditProfile(false);
    }


  return (
    <div className="editContainer">
        <form onSubmit={handleSubmit}>
            <label htmlFor="aboutMe">About Me</label><br></br>
            <textarea id="aboutMe" name="aboutMe" defaultValue={props.aboutMe} readOnly={false} rows={4} cols={50} onChange={(e) => setAboutMeInput(e.target.value)}></textarea><br></br>      
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default EditProfileInput
