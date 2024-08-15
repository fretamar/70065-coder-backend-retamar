import mongoose from "mongoose"

const userCollection = "usuarios"

const userSchema = new mongoose.Schema({
    nombre:{type: String, required: true, max:100},
    apellido: {type: String, required: true, max:100},
    email: {type: String, required: true, max:40},
    gender: {type: String, required: true}
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel