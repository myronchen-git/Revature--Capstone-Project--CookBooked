import React, { useEffect, useState } from 'react'
import { Review } from '../../types/types';
import axios from 'axios';
import PostReview from '../PostReview/PostReview';
import ReviewsList from '../Util/ReviewsList/ReviewsList';

// --------------------------------------------------

const serverBaseUrl = "http://localhost:4000";

// ==================================================


function DisplayReviews(props: any) {    
    const [reviewsData, setReviewsData] = useState([] as Review[]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchReviews();
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [reviewsData])
  
    // ----------
  
    /**
     * Retrieves the reviews under an associated recipeId
     */
    function fetchReviews() {
      console.log(`Fetching review under recipe ${props.recipeId}.`);
  
      axios
        .get(`${serverBaseUrl}/reviews?recipeId=${props.recipeId}`)
        .then((response) => {
          setReviewsData(response.data?.ReviewPosts.items);
        })
        .catch((err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
          }
          console.log(err.config);
        });
    }
  
    /**
     * Removes a review from the reviewsData state.
     *
     * @param reviewId the review ID belonging to the review to remove.
     */
    function removeReviewHandler(reviewId: string) {
      console.log(`Removing review ${reviewId}.`);
  
      const currentReviewsData = [...reviewsData];
  
      const index = currentReviewsData.findIndex((review) => {
        return review.reviewId === reviewId;
      });
  
      currentReviewsData.splice(index, 1);
      setReviewsData(currentReviewsData);
    }
  
    function addReviewHandler(review: Review) {
      console.log(`Adding review ${review.reviewId} to display list.`);
  
      const currentReviewsData = [...reviewsData];
      currentReviewsData.unshift(review);
      setReviewsData(currentReviewsData);
    }

    function checkErrorIfListEmpty() {
        if(!reviewsData || reviewsData.length === 0) {
            return (
                <h4>No Reviews Under This Recipe</h4>
            )
        } else {
            return (
                <ReviewsList reviews={reviewsData} onRemoveReview={removeReviewHandler} />
            )
        }
    }
      
  return (
    <>
        <PostReview recipeId={props.recipeId} recipeName={props.recipeName} onAddReview={addReviewHandler} />
        <div className='container mb-4'>
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

export default DisplayReviews