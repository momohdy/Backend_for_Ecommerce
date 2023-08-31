const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const addOrderToDB = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingInformation,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    // might have an error after await
    const createdOrder = await new Order({
      orderItems,
      user: req.user._id,
      shippingInformation,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }).save();

    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  //  id : id of order that been ordered

  const theOrder = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (theOrder) {
    res.json(theOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});


const updateOrderToPaid = asyncHandler(async (req, res) => {

  const theOrder = await Order.findById(req.params.id);

  if (theOrder) {
    theOrder.isPaid = true 
    theOrder.paidAt = Date.now()
    theOrder.paymentResult = {
      id : req.id ,
      status : req.status ,
      ubdate_time : req.ubdate_time ,
      // email_address : req.body.payer.email_address ,
    } 
    const theOrderAfterUbdate = await theOrder.save()

    res.json(theOrderAfterUbdate);

  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

const orderController = { addOrderToDB, getOrderById , updateOrderToPaid};

module.exports = orderController;
