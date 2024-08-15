import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 1000 },
    description: { type: String, required: true, max: 2000 },
    price: { type: Number, required: true, max: 20000 },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true, max: 20000 },
    category: { type: String, required: true, max: 50 }
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)
export default productModel
