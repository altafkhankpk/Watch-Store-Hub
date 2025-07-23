
import User from '@/models/userModel';
import bcrypt from 'bcrypt';

import { NextResponse } from "next/server";
export  async function POST(req) {
    try {
        // Get the request body
        let data = await req.json();
        console.log(data);

        // Find the user by email
        let user = await User.findOne({ email: data.email });

        console.log("userrrrrrrrrrrrrr")
        console.log(user)
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            });
        }
        console.log("data..........password")
        console.log(data.password)
        console.log("user..........password")
        console.log(user.password)

        const isPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({
                success: false,
                message: "Invalid password",
            });
        }
        // If passwords match, return success
        return NextResponse.json({
            success: true,
            message: "Login successful",
            // You can also return user data or a JWT token here
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        });
    }
}