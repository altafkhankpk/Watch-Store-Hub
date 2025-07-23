

import { useRouter } from "next/navigation";
import "./card.css"
import ReactStars from "react-rating-stars-component";

export default function MyWatchCard({ abc }) {
    let router= useRouter();

    // https://karim-next-2.s3.eu-north-1.amazonaws.com/karim-modified.png-1726679291884
    return <div className="mt-5 text-center pb-2">
        <div className="card" style={{ width: "320px", height: "550px" }} onClick={function(){
                     router.push("/details/"+abc._id)
        }}>
            {/* <img src={`https://altaf-next-1.s3.eu-north-1.amazonaws.com/${abc.file}`} className="card-img-top w-100  h-100" alt="..." /> */}
            <img src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com//${abc.file}`} className="card-img-top w-100  h-100" alt="..." />
            <div className="card-body">
                <h4 className="card-title"><b>{abc.watchName}</b></h4>
                <small>{abc.features.join(' | ')}</small>
                 
                <div className="  d-flex justify-content-center align-items-center">
                <ReactStars
                            count={5}
                            size={24}
                            isHalf={true}
                            value={abc.averageRating || 0} // Display average rating
                            edit={false} // Make the stars non-editable
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div><small>{`reviews: ${abc.reviewCount}`}</small></div>
                <h4 className="py-2">{`Rs:${abc.watchPrice}`} </h4>
                <p className="card-text">

                </p>
                <a href="#" className="btn btn-primary pb-1">
                    Buy Now
                </a>
            </div>
        </div>
 

    </div>
}