import React from 'react'
import './ProfileHeader.css';

function AboutMe(props: any) {


  return (
    <div className="aboutMeContainer">
        <p className="aboutMe">{props.aboutMe}</p>
    </div>
  )
}

export default AboutMe
