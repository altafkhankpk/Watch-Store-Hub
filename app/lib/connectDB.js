import mongoose from "mongoose";





export default function connectDB(){
    mongoose.connect("mongodb://localhost:27017/watchstore").then(function(connection){
        console.log(connection);
        console.log("Db connect successfully to watchstore-hub");
    })
}