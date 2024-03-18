import React, { useEffect, useState } from 'react'
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import axios from 'axios';

function PostComment(props: any) {
    let username = useSelector((state: RootState) => state.user.username);
    let token = useSelector((state: RootState) => state.user.token);
    const [isOpen, setIsOpen] = useState(false);
    const [commentBody, setCommentBody] = useState("");
    const [displayCheck, setDisplayCheck] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const URL = `http://localhost:4000/comments`

    function openForm() {
        setIsOpen(!isOpen);
        setDisplayCheck(false);
    }

    function submitComment(event: any) {
        if(commentBody) {
            event.preventDefault();
            const data = { reviewId: props.reviewId, content: commentBody};
            axios.post(`${URL}/`, data,{
                headers: {'Authorization': `Bearer ${token}`},
                })
                .then((resp) => {
                    setDisplaySuccess(true);
                    setIsOpen(!isOpen);
                    props.onAddComment(resp.data.CommentPost);
                    setCommentBody("");
                })
                .catch((err) => {
                    setDisplayError(true);
                })
        } else {
            setDisplayCheck(true);
            event.preventDefault();
        }
    }

    function onChangeText(value: string) {
        //setDisplayCheck if display error is currently there
        setDisplayCheck(false);
        setCommentBody(value);
    }


    function showPostComment() {
        if(username) {
            return (
            <div>
                {
                    //if isOpen is false then show the button to open form
                    (!isOpen &&
                        <div className='container fluid mb-4 p-4'>
                            <div className='row'>
                                <div className='col-12 d-flex justify-content-center'>
                                    <button type="button" className="btn btn-success btn-lg" onClick={openForm}>Post a Comment</button>
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
                                            <label htmlFor="validationTextarea" className="form-label me-3">Comment: </label>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <textarea className="form-control border-dark shadow" id="validationTextarea" placeholder="Your Comment" rows={5} cols={50} onChange={(e) => onChangeText(e.target.value)} required></textarea>
                                            {
                                                displayCheck && (
                                                    <h5 className='text-danger'>Please enter in comment body</h5>
                                                )
                                            }
                                            {
                                                displayError && (
                                                    <h5 className='text-danger'>Error Posting Comment</h5>
                                                )
                                            }
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-success" type="submit" onClick={submitComment}>Submit Comment</button>
                                        </div>
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
                                    <h3 className='text-light'>Successfully Posted Comment</h3>
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
        }, 3000)
    }, [displaySuccess])


  return (
    <>
        {showPostComment()}
    </>
  )
}

export default PostComment