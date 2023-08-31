const { default: mongoose } = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'User' ,
            requierd : true
        },
        orderItems : [
            {
                name : {type : String , requierd : true} ,
                product : {
                    type : mongoose.Schema.Types.ObjectId , 
                    ref : 'Product' ,
                    requierd : true
                },
                image : {type : String , requierd : true} ,
                quantity : {type : Number , requierd : true} ,
                price : {type : Number , requierd : true} ,
            }
        ],
        shippingInformation : {
            address : {type : String , requierd : true} ,
            city  : {type : String , requierd : true} ,
            postalCode : {type : Number , requierd : true} ,
            country  : {type : String , requierd : true} ,
        } ,
        paymentMethod : {
            type : String ,
            requierd : true 
        } ,
        itemsPrice : {
            type : String ,
        } ,
        shippingPrice : {
            type : Number ,
            requierd : true ,
            default : 0.0 
        } ,
        taxPrice : {
            type : Number ,
            requierd : true ,
            default : 0.0 
        } ,
        totalPrice : {
            type : String , 
        } ,
        paymentResult : {
            id :{ type : String , requierd : true}  ,
            email_adress : {type : String } ,
            status : {type : String } ,
            ubdate_time : {type : String } 
        } ,
        isPaid : {
            type : Boolean , 
            default : false ,
            requierd : true ,
        } ,
        paidAt : {
            type :Date ,  
            requierd : true ,
        } ,
        isDelivered : {
            type : Boolean , 
            default : false ,
            requierd : true ,
        } ,
        deliveredAt : {
            type :Date ,  
            requierd : true ,
        } ,
    }
)

const Order = mongoose.model('Order' , orderSchema) 

module.exports = Order;
 