import mongoose from "mongoose"

const cartCollection = "carrito"

const cartSchema = new mongoose.Schema({
    titulo:{type: String, required: true, max:100},
    productos:{type: Array, default: []},
    cantidad: {type: Number, required: true},
    precio: {type: Number, required: true},
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel