import React from 'react'
import ProfileHeader from './ProfileHeader/ProfileHeader'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import './Profile.css';
import ProfileReviewsView from './ProfileReviews/ProfileReviewsView';

const URL = `http://localhost:3000/`

function Profile() {
    let username = useSelector((state: RootState) => state.user.username)
    // let token = useSelector((state: RootState) => state.user.token)

  return (
    <div className="profile">
      <div className="profileHeader">
        <ProfileHeader username={username}/>
        <ProfileReviewsView username={username} />
      </div>
    </div>
  )
}

export default Profile
