const mongoose=require('mongoose')
const mongooseURI= "mongodb://127.0.0.1/figma";

const dbconnection=async()=>{
    try {
        await mongoose.connect(mongooseURI)
        console.log("App is connected to database.")
    } catch (error) {
        if(error) throw error;
    }
}
module.exports=dbconnection;