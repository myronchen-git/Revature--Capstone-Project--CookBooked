import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AboutMe from './AboutMe';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProfilePicture from './ProfilePicture';
import EditProfileContainer from '../EditProfile/EditProfileContainer';
import './ProfileHeader';

const URL = `http://localhost:4000/accounts`

function ProfileHeader(props: any) {
  let username = useSelector((state: RootState) => state.user.username);
  const [aboutMe, setAboutMe] = useState("About me...");
  const [imageUrl, setImageUrl] = useState("https://test-image-bucket-rev.s3.us-west-1.amazonaws.com/default.webp");

  async function getProfileInfo(username: string) {
    try {
      let response = await axios.get(`${URL}/${username}`);
      if (response.data.aboutMe) {
        setAboutMe(response.data.aboutMe);
      }
      if (response.data.imageUrl) {
        setImageUrl(response.data.imageUrl);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (username) {
      getProfileInfo(username)
    }
  }, [])

  function getProfileContent() {
    if (username) {
      return (
        <div className="header">
          <ProfilePicture imageUrl={imageUrl}/>
          <h2 className="title">{username}</h2>
          <AboutMe aboutMe={aboutMe} />
          {/* user's reviews... */}
          <EditProfileContainer aboutMe={aboutMe} setAboutMe={setAboutMe} setImageUrl={setImageUrl} />
        </div>
      )
    } else {
      return (
        <div>
          <p>You must be logged in to view your profile</p>
        </div>
      )
    }
  }

  return (
    <>
      {getProfileContent()}
    </>
  )
}

export default ProfileHeader

// Image
// Username
// About Me
