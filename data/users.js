const bcrypt = require('bcryptjs')

const users = [
    {
        name : "Admin User" , 
        email : "Admin@example.com" ,
        password : bcrypt.hashSync('12345',10) ,
        isAdmin : true 
    } ,
    {
        name : "Abdelfattah Mohdy" , 
        email : "Abdelfattah@example.com" ,
        password : bcrypt.hashSync('12345',10) ,
         
    } ,
    {
        name : "Hager Elmeery" , 
        email : "Hager@example.com" ,
        password : bcrypt.hashSync('12345',10) ,
         
    }
] 

module.exports = users;
