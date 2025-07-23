import { Watch } from "@/models/watch";
import { NextResponse } from "next/server";





import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// S3 client initialization
let s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID, // Corrected field
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY,
    },
});
async function uploadFileToS3(file, fileName, contentType) {
    let fileBuffer = file;
    const fileKey = `${fileName}-${Date.now()}`;
    console.log("Uploading file to S3:", fileName);

    let params = {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
        Key: fileKey, // File key with a timestamp
        Body: fileBuffer, // File content as buffer
        ContentType: contentType, // Dynamic content type based on the file
    };

    console.log("S3 upload parameters:", params);

    // Uploading the file to S3
    let command = new PutObjectCommand(params);
    let result = await s3Client.send(command);

    
    console.log("File upload result:", result);
    return fileKey;
}


export async function POST(req) {
    try {
        let formData = await req.formData();
        let file = formData.get("file");

        let watchName = formData.get("watchName");
        let watchPrice = Number(formData.get("watchPrice")); // Ensure watchPrice is cast to a Number
        let watchCategory = formData.get("watchCategory").split(",");
        let watchDesc = formData.get("watchDesc");
        let features = formData.get("features").split(','); // Convert features from a comma-separated string to an array

        console.log(file, "this is file");
        console.log("FormData", formData);

        let buffer = Buffer.from(await file.arrayBuffer());
        let contentType = file.type; // Get the file's MIME type
        console.log("File buffer created:", buffer);

        // Upload file to S3
        let fileName = await uploadFileToS3(buffer, file.name, contentType);
        console.log("File uploaded:", fileName);

        let newData = new Watch({
            watchName,
            watchPrice,
            watchCategory,
            watchDesc,
            features,
            file: file ? fileName : '' // Add the file name to the schema if provided
        });

        await newData.save();
        console.log("This is new data", newData);

        return NextResponse.json({
            success: true,
            formData
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            error: err.message
        });
    }
}

export async function GET(req){
    
    try{
     let data= await Watch.find();
     console.log("this is data")
     console.log(data)


        return NextResponse.json({
            success:true,
            data
        })

    }catch(err){
        console.log(err);
        return NextResponse.json({
            success:false,

        })
    }
}
