import express from 'express'
import productosRouter from "../routes/productos.routes.js"
import carritoRouter from "../routes/carrito.routes.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from '../routes/views.router.js'
import mongoose from 'mongoose'
import userRouter from '../routes/users.router.js'
import { Server } from 'socket.io'
import http from 'http'
import productModel from './models/product.model.js'

const app = express()
const PORT = 8080

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', productosRouter)
app.use('/', carritoRouter)
app.use('/', viewsRouter)
app.use('/', userRouter)

// Configuracion de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


mongoose.connect("mongodb+srv://franretamar:Knd281195.-@cluster0.oj1pn.mongodb.net/coderBackend?retryWrites=true&w=majority&appName=Cluster0")

    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectar a la base de datos", error)
    })

const httpServer = http.createServer(app)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))


socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado")

    const productosFiltrados = async () => {
        const productosActuales = {}
        const products = await productModel.find(productosActuales).lean()
        socket.emit('actualizarProductos', products)
    }

    socket.on('agregarProducto', async product => {
        try {
            await productModel.create(product)
            productosFiltrados()
        } catch (err) {
            console.error("Error al agregar el producto:", err)
        }
    })

    socket.on('eliminarProducto', async idProducto => {
        try {
            await productModel.findByIdAndDelete(idProducto)
            productosFiltrados()
        } catch (err) {
            console.error("Error al eliminar el producto:", err)
        }
    })
})


export { socketServer }