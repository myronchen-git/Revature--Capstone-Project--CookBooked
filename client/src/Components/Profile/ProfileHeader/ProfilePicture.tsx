import React from 'react'
import './ProfileHeader.css';

function ProfilePicture(props: any) {

  return (
    <>
      <img className="profilePicture" src={props.imageUrl} />
    </>
  )
}

export default ProfilePicture
