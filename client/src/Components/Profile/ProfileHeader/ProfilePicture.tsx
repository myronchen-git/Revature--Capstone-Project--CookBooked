import React from 'react'

function ProfilePicture(props: any) {

  return (
    <>
      <p>{props.imageUrl}</p>
      <img className="profilePicture" src={props.imageUrl} width="100" height="100"/>
    </>
  )
}

export default ProfilePicture
