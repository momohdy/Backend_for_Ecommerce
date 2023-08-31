
const mongoose = require('mongoose') ;
const DBconnection = () =>{
    try{
        mongoose.connect(process.env.MONGO_URL) 
        console.log("MONGODB connect");
    }
    catch (err){
        console.log(err.message);
    }
} 

module.exports = DBconnection;
