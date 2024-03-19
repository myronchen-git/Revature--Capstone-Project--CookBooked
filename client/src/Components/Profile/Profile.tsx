import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Profile.css';
import ProfileReviewsView from './ProfileReviews/ProfileReviewsView';
import { useParams } from 'react-router-dom';

function Profile() {
    const { target } = useParams();
    

    function getProfileContent() {
      return (
        <div>
          <div className="profileHeader">
            <ProfileHeader username={target}/>
          </div>
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
