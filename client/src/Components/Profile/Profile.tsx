import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Profile.css';
import ProfileReviewsView from './ProfileReviews/ProfileReviewsView';
import { useParams } from 'react-router-dom';

// const URL = `http://localhost:3000/`

function Profile() {
    const { target } = useParams();
    

    function getProfileContent() {
      return (
        <div className="profileHeader">
          <ProfileHeader username={target}/>
          <ProfileReviewsView username={target} />
        </div>
      )
    }

    useEffect(() => {
      getProfileContent();
    }, [target])

  return (
    <div className="profile">
      {getProfileContent()}
    </div>
  )
}

export default Profile
