import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import './PostReview.css'
import UploadImageInput from '../ImageUploader/UploadImageInput';

// --------------------------------------------------

const serverBaseUrl = "http://localhost:4000/reviews";

// ==================================================

function PostReview(props: any) {
    let username = useSelector((state: RootState) => state.user.username);
    let token = useSelector((state: RootState) => state.user.token);
    const [isOpen, setIsOpen] = useState(false);
    const [reviewBody, setReviewBody] = useState("");
    const [rating, setRating] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    const [displayCheckImage, setDisplayCheckImage] = useState(false);
    const [displayCheckRating, setDisplayCheckRating] = useState(false);
    const [displayCheck, setDisplayCheck] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    
    //Add post review in here as well so it is before each review display
    function openForm() {
        setIsOpen(!isOpen);
        setDisplayCheck(false);
    }

    function submitReview(event: any) {
        if(!reviewBody) {
            event.preventDefault();
            setDisplayCheck(true);
        } else if(rating === 0) {
            event.preventDefault();
            setDisplayCheckRating(true);
        } else if(!imageUrl) {
            event.preventDefault();
            setDisplayCheckImage(true);
        } else {
            event.preventDefault();
            const data = { recipeId: props.recipeId, recipeName: props.recipeName, rating, imageUrl, content: reviewBody};
            axios.post(`${serverBaseUrl}/`, data,{
                headers: {'Authorization': `Bearer ${token}`},
                })
                .then((resp) => {
                    if(resp.data.message === 'Error: Invalid URL') {
                        setDisplayError(true);
                    } else {
                        setDisplaySuccess(true);
                        setIsOpen(!isOpen);
                        props.onAddReview(resp.data.ReviewPost);
                    }
                })
                .catch((err) => {
                    setDisplayError(true);
                })
        }
    }

    function onChangeReviewBodyText(value: string) {
        //setDisplayCheck if display error is currently there
        setDisplayCheck(false);
        setReviewBody(value);
    }

    function onChangeRating(event: any) {
        const newRating = parseInt(event.target.value);
        setRating(newRating);
        setDisplayCheckRating(false);
    }

    function onChangeImage(url: string) {
        setImageUrl(url);
        setDisplayCheckImage(false);
    }


    function showPostReview() {
        if(username) {
            return (
            <div>
                {
                    //if isOpen is false then show the button to open form
                    (!isOpen &&
                        <div className='container fluid mb-4 p-4'>
                            <div className='row'>
                                <div className='col-12 d-flex justify-content-center'>
                                    <button type="button" className="btn btn-success btn-lg" onClick={openForm}>Post a Review</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    //if isOpen is true then show the form
                    (isOpen &&
                        <div className='container fluid mb-4 bg-light p-4 rounded'>
                            <div className='row'>
                                <div className='col-12 d-flex justify-content-start'>
                                    <button type="button" className="btn btn-danger" onClick={openForm}>Close</button>
                                </div>
                            </div>
                            <div className='row my-4'>
                                <div className='col-12 d-flex justify-content-center'>
                                    <form className="row g-3 needs-validation">
                                        <div className="col-12 d-flex justify-content-start">
                                            <label htmlFor="validationTextarea" className="form-label me-3">Review: </label>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <textarea className="form-control border-dark shadow" id="validationTextarea" placeholder="Your Comment" rows={5} cols={50} onChange={(e) => onChangeReviewBodyText(e.target.value)} required></textarea>
                                        </div>
                                        {
                                            displayCheck && (
                                                <div className='col-12'>
                                                    <h5 className='text-danger'>Please Enter a Review Body</h5>
                                                </div>
                                            )
                                        }
                                        <div className="col-12 d-flex justify-content-start">
                                            <label htmlFor="validationTextarea" className="form-label me-3">Rating: </label>
                                        </div>
                                        <div className="col-12 mb-3 d-flex justify-content-start">
                                            <div className='col-2'>
                                                <input type="radio" className="btn-check" name="options" id="option1" value="1" onChange={onChangeRating} autoComplete="off"></input>
                                                <label className="btn btn-secondary" htmlFor="option1">1 Star</label>
                                            </div>
                                            <div className='col-2'>
                                                <input type="radio" className="btn-check" name="options" id="option2" value="2" onChange={onChangeRating} autoComplete="off"></input>
                                                <label className="btn btn-secondary" htmlFor="option2">2 Star</label>
                                            </div>
                                            <div className='col-2'>
                                                <input type="radio" className="btn-check" name="options" id="option3" value="3" onChange={onChangeRating} autoComplete="off"></input>
                                                <label className="btn btn-secondary" htmlFor="option3">3 Star</label>
                                            </div>
                                            <div className='col-2'>
                                                <input type="radio" className="btn-check" name="options" id="option4" value="4" onChange={onChangeRating} autoComplete="off"></input>
                                                <label className="btn btn-secondary" htmlFor="option4">4 Star</label>
                                            </div>
                                            <div className='col-2'>
                                                <input type="radio" className="btn-check" name="options" id="option5" value="5" onChange={onChangeRating} autoComplete="off"></input>
                                                <label className="btn btn-secondary" htmlFor="option5">5 Star</label>
                                            </div>                                       
                                        </div> 
                                        {
                                            displayCheckRating && (
                                                <div className='col-12'>
                                                    <h5 className='text-danger'>Please Select a Rating</h5>
                                                </div>
                                            )
                                        }
                                        <div className="col-12 d-flex justify-content-start">
                                            <label htmlFor="validationTextarea" className="form-label me-3">Image: </label>
                                        </div>
                                        <div className="col-12 d-flex justify-content-start">
                                            <UploadImageInput tableName="reviews" retrieveUrl={onChangeImage}/>
                                        </div>
                                        {
                                            displayCheckImage && (
                                                <div className='col-12'>
                                                    <h5 className='text-danger'>Please Enter an Image</h5>
                                                </div>
                                            )
                                        }
                                        <div className="col-12">
                                            <button className="btn btn-success" type="submit" onClick={submitReview}>Submit Review</button>
                                        </div>
                                        {
                                            displayError && (
                                                <div className='col-12'>
                                                    <h5 className='text-danger'>Error Posting Review</h5>
                                                </div>
                                            )
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    displaySuccess && (
                        <div className='container fluid mb-4 p-4 bg-success'>
                            <div className='row'>
                                <div className='col-12 d-flex justify-content-center'>
                                    <h3 className='text-light'>Successfully Posted Review</h3>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    //useEffect will clear out the success message
    useEffect(() => {
        setTimeout(() => {
            setDisplaySuccess(false);
        }, 5000)
    }, [displaySuccess]);

  return (
    <div>
        {showPostReview()}
    </div>
  )
}

export default PostReview