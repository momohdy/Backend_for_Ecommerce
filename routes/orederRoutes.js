const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderControllers");
const viewDecodedIdFromHeader = require("../middleware/authMiddleware")


router.route('/').post(viewDecodedIdFromHeader,orderController.addOrderToDB)
router.route('/:id').get(viewDecodedIdFromHeader,orderController.getOrderById)
router.route('/:id/pay').put(viewDecodedIdFromHeader,orderController.updateOrderToPaid)


module.exports = router;
