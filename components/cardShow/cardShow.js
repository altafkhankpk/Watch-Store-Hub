"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import MyWatchCard from "../card/card";

export default function ShowCard() {
    const [products, setProduct] = useState([]); 
    let [watchList,setWatchList]=useState([]);


    useEffect(() => {
        axios.get("api/watchapi").then(function (resp) {
            console.log("this is fdata coming from db");

            console.log(resp.data.data);
              
            let myData = resp.data.data.map((watch)=>{
                const reviews=watch.reviews ||[];
                const totalRatings = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
            const averageRating = reviews.length ? totalRatings / reviews.length : 0;
            
            return { ...watch, averageRating,reviewCount:reviews.length }; // Add averageRating to each watch

            });

            
            console.log("review")
              console.log(myData.map((watch)=>console.log(watch.reviews)));
            // console.log("this is watch name");
            // console.log(myData.map(watch => watch.watchName)); 
            if (myData) {
                setProduct(myData.slice(0, 4));
                setWatchList(myData)
            }
        });
    }, []);

    let handleWatchCategory = (watchname) => {
        // Filter watches that have "Smart Watch" in their watchCategory array
        let selectedWatchCategory = watchList.filter(watch => 
            watch.watchCategory.some(category => 
                category.trim().toLowerCase() === watchname.toLowerCase()
            )
        );
    
        console.log(selectedWatchCategory);  // This will log all the watches that have "Smart Watch" in their categories
        console.log(selectedWatchCategory.length);  // Check how many smart watches are selected
        
        setProduct(selectedWatchCategory);  // Update the state with the filtered smart watches
    };
    
    return (
        <div>

            <div className="d-flex gap-1 pt-3 one">
                <a className="box text-center nav-link " onClick={()=>handleWatchCategory("smart watch")}>
                    <img src="smart.webp"></img>
                    <div className="cart-title"><b>smart watch<br></br> Series</b></div>
                </a>
                <a className="box text-center " onClick={()=>handleWatchCategory("Time Of Happiness")}>
                    <img src="time.webp"></img>
                    <div className="cart-title"><b>Time Of Happiness</b></div>
                </a>
                <a className="box text-center " onClick={()=>handleWatchCategory("Men Formal")}>
                    <img src="menformal.webp"></img>
                    <div className="cart-title"><b>Men Formal</b></div>
                </a>
                <div className="box text-center " onClick={()=>handleWatchCategory("Female Watches")}>
                    <img src="female.webp"></img>
                    <div className="cart-title"><b>Female Watches</b></div>
                </div>
                <div className="box text-center" onClick={()=>handleWatchCategory("Sport Collection")}>
                    <img src="sport.webp"></img>
                    <div className="cart-title"><b>Sport Collections</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("Best Selling")}>
                    <img src="couple.webp"></img>
                    <div className="cart-title"><b>Best Selling</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("Limited Stock")}>
                    <img src="best.webp"></img>
                    <div className="cart-title"><b>Limited Stock</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("smart watch Series")}>
                    <img src="limited.webp"></img>
                    <div className="cart-title"><b>smart watch Series</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("")}>
                    <img src="femalebra.webp"></img>
                    <div className="cart-title"><b>smart watch Series</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("")}>
                    <img src="round.webp"></img>
                    <div className="cart-title"><b>smart watch Series</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("Leather Watch")}>
                    <img src="leather.webp"></img>
                    <div className="cart-title"><b>Leather Watch</b></div>
                </div>
                <div className="box text-center " onClick={()=>handleWatchCategory("")}>
                    <a href="#" className="nav-link" >
                    <img src="femalebra.webp"></img>
                    <div className="cart-title"><b>smart watch Series</b></div>
                    </a>
                </div>
            </div>
            <div className="d-flex gap-2 justify-content-center flex-wrap ">
                {/* Mapping over the products array */}
                {products.map(function (prod) {
                    return <MyWatchCard key={prod._id} abc={prod}></MyWatchCard>;
                })}
            </div>
        </div>
    );
}
