import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        /*  
            //--------- TEST CODE --------- 
            // const MONGODB_URI='mongodb+srv://abhi2202:abhi1234@cluster0.oexm4pd.mongodb.net/'
            // const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        */
        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
        // console.log("env - variable :", process.env.MONGODB_URI);
        

    } catch (error) {
        console.log("error is : ", error);
        process.exit(1)       
    }
}


export default connectDB;