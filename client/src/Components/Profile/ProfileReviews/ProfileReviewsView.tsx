import React, { useEffect, useState } from 'react'
import { Review } from '../../../types/types'
import axios from 'axios';
import ErrorView from '../../Error/ErrorView';
import ReviewsList from '../../Util/ReviewsList/ReviewsList';

const URL = `http://localhost:4000`

function ProfileReviewsView(props: any) {
    const [reviewsData, setReviewsData] = useState([] as Review[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, [])

    useEffect(() => {
        setLoading(false);
    }, [reviewsData])

    function fetchReviews() {
        axios.get(`${URL}/reviews?author=${props.username}`)
            .then((response) => {
                setReviewsData(response.data?.ReviewPosts.items);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log("Error:", err.message);
                }
                console.log(err.config);
            });
    }

    function removeReviewHandler(reviewId: string) {
        const currentReviewsData = [...reviewsData];

        const index = currentReviewsData.findIndex((review) => {
            return review.reviewId === reviewId;
        });

        currentReviewsData.splice(index, 1);
        setReviewsData(currentReviewsData);
    }

    function checkErrorIfListEmpty() {
        console.log(reviewsData);
        if (!reviewsData || reviewsData.length === 0) {
            return (
                <ErrorView message={'This user has not posted any reviews yet'} isError={true} />
            )
        } else {
            return (
                <ReviewsList reviews={reviewsData} onRemoveReview={removeReviewHandler} />
            )
        }
    }

  return (
    <>
        <div className='container-fluid bg-light mb-4'>
            <div className='row'>
                <div className='col'>
                    {
                        loading ? <h4>Loading Reviews</h4> :
                        checkErrorIfListEmpty()
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileReviewsView
