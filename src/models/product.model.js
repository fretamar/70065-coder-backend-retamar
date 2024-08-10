import mongoose from "mongoose";

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    titulo:{type: String, required: true, max:100},
    descripcion: {type: String, required: true, max:200},
    precio: {type: Number, required: true, max:5},
    stock: {type: Number, required: true, max:4},
    categoria: {type: String, required: true, max:20}
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel