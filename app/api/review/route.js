// In your API route
 
import { Watch } from "@/models/watch";
import { NextResponse } from "next/server";

export  async function POST(req, res) {
    
    
    let data= await req.json()
    console.log(data)
    // const { ad, reviewData } = await req.json()

        console.log("this is key of product")
        console.log(data.ab)

        console.log("this is review data")
        console.log(data.reviewData)

        try {
            // Find the watch by ID and update with new review
            let watch = await Watch.findById(data.ab);
            console.log(watch)
            watch.reviews.push(data.reviewData);
            
            // Calculate average rating
            // const totalRating = watch.reviews.reduce((sum, r) => sum + r.rating, 0);
            // watch.avgRating = totalRating / watch.reviews.length;

            await watch.save();
            return NextResponse.json({
                success:true,
            //    totalRating,
               watch 
            })
            // res.status(200).json({ success: true, data: watch });
            
        } catch (err) {
            console.log(err)
            return NextResponse.json({
                success:false,
            })
            // res.status(500).json({ success: false, message: 'Server error' });
        }
     
}
