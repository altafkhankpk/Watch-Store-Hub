"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import StarRatingComponent from 'react-star-rating-component';


export default () => {
    // Since the dynamic folder is [ab], we destructure 'ab' from useParams
    let { ab } = useParams();
    let [ad, setAd] = useState({});
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [rating, setRating] = useState(0);
    let [avgRating, setAvgRating] = useState(0);
    let [countReview,setReviewCount]=useState()


    useEffect(() => {
        if (ab) { // Ensure 'ab' is available
            console.log(ab); // Log 'ab' to check the value (it should be your ID)

            // Fetch the watch details using the 'ab' (ID)
            axios.get(`/api/watchapi`).then(function (resp) {
                console.log(resp.data.data); // Print the response from the API
                //   let mydata=resp.data
                let currentDetail = resp.data.data.find(item => item._id === ab);
                console.log(currentDetail)
                setReviewCount(currentDetail.reviews.length)
                
                if (currentDetail && currentDetail.reviews && currentDetail.reviews.length > 0) {
                    console.log("Calculating average rating...");

                    // Calculate the average rating
                    const totalRating = currentDetail.reviews.reduce((sum, review) => sum + review.rating, 0);
                    const average = totalRating / currentDetail.reviews.length;
                                  
                    console.log(average); 

                    // Set the average rating to state
                    setAvgRating(Number(average)); // Ensure this is a number

                } else {
                    setAvgRating(0); // Set to 0 if no reviews are available
                }
                setAd(currentDetail);
                console.log(ad)
                console.log(ad.watchName) // Set the watch data to the state
            })
                .catch(function (err) {
                    console.error(err);
                });
        }
    }, [ab]); // Effect runs when 'ab' changes


    const onSubmit = (data) => {
        if (rating === 0) {
            alert("Please give a rating");
            return;
        }
        data.CustomerName = "karim lucky";
        data.rating = rating;
        // Include rating in form data
        // { { watchId, review }, review }
        const reviewData = { ...data, };

        // Call the submit function passed as props
        console.log(reviewData)
        if (reviewData) {
            axios.post("/api/review", { reviewData, ab }).then(function (resp) {
                console.log(resp.data);

                if (resp.data.success) {
                    toast.success("review submit successfull")
                } else {
                    toast.error("review not submitted!...")
                }
            })
        }
        // handleSubmitReview(reviewData);

        // Reset form after submission
        reset();
        setRating(0); // Reset rating to zero
    };

    return (
        <div>
            <div className="container">
                <div className="card">
                    <div className="container-fluid">
                        <div className=" d-flex flex-wrap align-items-center justify-content-center text-center">
                            <div className="preview col-md-6">
                                <div className="preview-pic tab-content">
                                    <div className="tab-pane active" id="pic-1" style={{ maxWidth: "450px", }}>
                                        <img src={`https://karim-next-2.s3.eu-north-1.amazonaws.com/${ad.file}`} alt="Watch" style={{ maxWidth: "100%", borderRadius: "20px" }} />
                                        {/* this is my image */}
                                    </div>
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h2 className="product-title text-uppercase">{ad.watchName}</h2>
                                <span>
                                    {ad.features && ad.features.length > 0 ? ad.features.join(' | ') : 'No features available'}
                                </span>
                                {/* <span><b>{ad.features}</b></span> */}
                                <h4 className="price">
                                    current price: <span>{ad.watchPrice}</span>
                                </h4>
                                <div className="  d-flex justify-content-center align-items-center">

                                    {/* {avgRating} */}

                                     <StarRatingComponent 
                                    name="rate2" 
                                    editing={false}
                                    // fullIcon={<i className="fa fa-star"></i>}
                                    // halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    // emptyIcon={<i className="far fa-star"></i>}

                                    renderStarIcon={() => <span><i className="far fa-star"></i></span>}
                                    starCount={5}
                                    value={avgRating}
                                  /><span className="ms-3 "><b>({countReview})</b></span>



                                </div>
                                <p className="product-description">{ad.watchDesc}</p>
                                <div className="action">
                                    <button className="add-to-cart btn btn-danger" type="button">
                                        add to cart
                                    </button>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Give A Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Button trigger modal --> */}
                 

                {/* <!-- Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Submit Your Review</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Star Rating */}
                                <label className="form-label">Give a Rating:</label>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    value={avgRating}
                                    onChange={newRating => setRating(newRating)}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />

                                {/* Comment Section */}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="reviewText" className="form-label">Write a comment:</label>
                                        <textarea
                                            className="form-control"
                                            id="reviewText"
                                            rows="3"
                                            {...register("reviewText", {
                                                required: "Comment is required",
                                                minLength: {
                                                    value: 5,
                                                    message: "Comment must be at least 5 characters long"
                                                }
                                            })}
                                        ></textarea>
                                        {errors.reviewText && <p className="text-danger">{errors.reviewText.message}</p>}
                                    </div>

                                    {/* Modal Footer with Submit Button */}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Submit Review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
