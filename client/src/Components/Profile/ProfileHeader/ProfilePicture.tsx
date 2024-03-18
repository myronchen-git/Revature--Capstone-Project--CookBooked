import React, { useEffect } from 'react'
import './ProfileHeader.css';

function ProfilePicture(props: any) {

  useEffect(() => {
    getProfilePicture();
  }, [props.imageUrl])

  function getProfilePicture() {
    return (
      <img className="profilePicture" src={props.imageUrl} />
    )
  }

  return (
    <>
      {getProfilePicture()}
    </>
  )
}

export default ProfilePicture
