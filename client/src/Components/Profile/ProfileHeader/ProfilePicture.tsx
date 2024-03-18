import React from 'react'
import './ProfileHeader.css';

function ProfilePicture(props: any) {

  return (
    <div className="pictureContainer">
      <img className="profilePicture" src={props.imageUrl} />
    </div>
  )
}

export default ProfilePicture
