const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DBconnection = require("./config/DBconnection");

const users = require("./data/users");
const products = require("./data/Products");

const Order = require("./models/orderModel");
const Product = require("./models/productModel");
const User = require("./models/userModel");

dotenv.config();

DBconnection();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    
    const UsersWithUniqueIds = await User.insertMany(users);
    
    const productsWithAdminId = products.map((prod) => {
        return { ...prod, user: UsersWithUniqueIds[0]._id };
    });
    
    await Product.insertMany(productsWithAdminId);

    console.log("Data Imported");

    // process.exit(1); 
  } catch (error) {
    console.log(error);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destryed");

    process.exit(1);
  } catch (error) {
    console.log(error);
    // process.exit(1);
  }
};

if(process.argv[2]=== '-d'){
    destroyData() ;
} else {
    importData();
}
