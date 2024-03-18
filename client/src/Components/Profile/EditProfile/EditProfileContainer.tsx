import React, { useState } from 'react'
import EditProfileInput from './EditProfileInput'
import UploadImageInput from '../../ImageUploader/UploadImageInput'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import './EditProfile.css'

const URL = `http://localhost:4000/accounts`

function EditProfileContainer(props: any) {
    const [showEditProfile, setShowEditProfile] = useState(false);
    let token = useSelector((state: RootState) => state.user.token);
    

    function toggleShowEditProfile() {
        setShowEditProfile(!showEditProfile);
    }

    async function updateProfile(field: string, content: string) {
        try {

            let data = {};
            if (field == 'aboutMe') {
                data = {aboutMe: content};
                props.setAboutMe(content);
            } else if (field == 'imageUrl') {
                data = {imageUrl: content};
                props.setImageUrl(content);
            }

            console.log(data);
            let response = await axios.put(`${URL}/profile`, data, {
                headers: {'Authorization': `Bearer ${token}`},
            })
            console.log(response)           
        } catch (err) {
            console.log(err);
        }
    }


  return (
    <div className="editProfileContainer"> 
        <button className="editButton" onClick={toggleShowEditProfile}>Edit Profile</button>
        {showEditProfile &&
            <div>
                {/* show conditionally? */}
                <EditProfileInput aboutMe={props.aboutMe} setShowEditProfile={setShowEditProfile} updateProfile={updateProfile} />
                <UploadImageInput tableName="accounts" updateDatabase={updateProfile}/>
            </div>
        }
    </div>
  )
}

export default EditProfileContainer
