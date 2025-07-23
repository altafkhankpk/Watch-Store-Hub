
import User from "@/models/userModel";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

// ye function k through hum ne password ko encrypt kiya bs srf neche call kiya hai bs
// const hashedPasswords = async (password) => {
//     let saltRound = 10;
//     let hashedPassword = await bcrypt.hash(password, saltRound);
//     return hashedPassword;
// }
// or///////
const hashedPasswords= async (itempass)=>{
    let saltRound=10;
    const hashpassword= await bcrypt.hash(itempass,saltRound)
    return hashpassword;
}

export async function POST(req) {

    console.log("Request received");

    try {
        const data = await req.json();
        console.log("Received data:", data);
        console.log(data.email);

        // Using aggregation to check if the email already exists
        const existingUser = await User.aggregate([
            { $match: { email: data.email } },
        ]);

        if (existingUser.length > 0) {
            // If the email already exists, return a response
            return NextResponse.json({
                success: false,
                message: "Email already exists",
            });
        }
        console.log("without hashpaswordddd")
        console.log(data.password);
        console.log("hashheeeeeeeeeeeeeeeeeeeed paswordddddddd llllllllllllllll")
        data.password= await hashedPasswords(data.password)
        let newUser = new User(data);

        console.log("]]]]]]]]]]]]]]]");
        await newUser.save();
        console.log("dddddddddddd");
        console.log(newUser);

        return NextResponse.json({
            success: true,
            message: "Data processed and user saved successfully",
        });
    } catch (err) {
        console.error("Error:", err);

        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}





