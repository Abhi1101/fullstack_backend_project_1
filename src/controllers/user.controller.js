import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import mongoose from "mongoose";

const registerUser = asyncHandler( async (req , res)=>{
    //  res.status(200).json({
    //     message: "heyy welcome !"
    // })
    
    const {email , password , username ,fullName } = req.body
    console.log("email: ",email);
    console.log("password: ",password);
    
    // CHECK FOR ALL FIELDS/DATA  
    if(
        [fullName, email, password , username].some((fields)=>
            fields?.trim() === ""
        )
    ){
        throw new ApiError("400","all fields required !!!")
    }

    // CHECK FOR IF USER ALREADY EXIXTS
   const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        throw new ApiError(400,`user with email:${email} and username:${username} already exists`)
    }

    // CHECK FOR AVATAR FILE IS UPLOADED OR NOT
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError("400", "avatar file required ")
    }
    
    //UPLOAD AVATAR ON CLOUDINARY 
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    
    if(!avatar){
        throw new ApiError("400", "avatar file required ")
    }

    // REGISTERING THE USER ON MONGO-DB DATABASE 
    
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "somthing went wrong while creating a user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "user registered successfully")
    )
    
    
    //--------------------------------------------------------------------------------------------
} )

export {registerUser}

