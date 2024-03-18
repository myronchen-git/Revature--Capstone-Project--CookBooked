import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AboutMe from './AboutMe';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import ProfilePicture from './ProfilePicture';
import EditProfileInput from '../EditProfile/EditProfileInput';
import UploadImageInput from '../../ImageUploader/UploadImageInput';
import EditProfileContainer from '../EditProfile/EditProfileContainer';

const URL = `http://localhost:4000/accounts`

function ProfileHeader(props: any) {
  let redux_username = useSelector((state: RootState) => state.user.username);
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
      getProfileInfo(props.username)
  }, [props.username])

  function getProfileContent() {
    if (props.username == redux_username) {
      return (
        <div>
          <p>{props.username}'s Profile</p>
          <ProfilePicture imageUrl={imageUrl}/>
          <AboutMe aboutMe={aboutMe} />
          <EditProfileContainer aboutMe={aboutMe} setAboutMe={setAboutMe} setImageUrl={setImageUrl} />  
        </div>
      )
    } else {
      return (
        <div>
          <p>{props.username}'s Profile</p>
          <ProfilePicture imageUrl={imageUrl}/>
          <AboutMe aboutMe={aboutMe} />
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

