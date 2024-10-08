import Router from 'express'
const userRouter = Router()
import userModel from '../src/models/user.model.js'

userRouter.get('/users', async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: "succes", payload: users })
    } catch (error) {
        console.error(error)
    }
})

userRouter.post('/users', async (req, res) => {
    let { nombre, apellido, email, gender } = req.body
    if (!nombre || !apellido || !email || !gender) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await userModel.create({ nombre, apellido, email, gender })
    res.send({ result: "success", payload: result })
})

userRouter.put('/:uid', async (req, res) => {
    let { uid } = req.params

    let usuarioModificado = req.body
    if (!usuarioModificado.nombre || !usuarioModificado.apellido || !usuarioModificado.email || !usuarioModificado.gender) {
        res.send({ status: "error", error: "Faltan completar datos" })
    }

    let result = await userModel.updateOne({ _id: uid }, usuarioModificado)
    res.send({ result: "success", payload: result })
})

userRouter.delete('/:uid', async(req,res)=>{
    let { uid } = req.params
    let result = await userModel.deleteOne({_id: uid})
    res.send({resultado: "success", payload: result})
})



export default userRouter
