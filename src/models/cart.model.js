import mongoose from "mongoose";

const cartCollection = "carrito"

const cartSchema = new mongoose.Schema({
    titulo:{type: String, required: true, max:100},
    cantidad: {type: Number, required: true, max:4},
    precio: {type: Number, required: true, max:6},
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel