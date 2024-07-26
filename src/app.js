import express from 'express'
import productosRouter from "../routes/productos.routes.js"
import carritoRouter from "../routes/carrito.routes.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import viewsRouter from '../routes/views.router.js'
import { Server } from 'socket.io'
import fs from 'fs/promises'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', productosRouter)
app.use('/', carritoRouter)
app.use('/', viewsRouter)

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)

socketServer.on('connection', async socket => {
    console.log("Nuevo cliente conectado")

    let products = await getProducts() 

    socket.on('agregarProducto', async product => {
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1
        product.id = id
        products.push(product)
    
        try {
            await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))
            socketServer.emit('actualizarProductos', products)
        } catch (err) {
            console.error("Error al guardar el producto:", err)
        }
    })

    socket.on('eliminarProducto', async idProducto => {
        products = products.filter(product => product.id !== parseInt(idProducto)) 
    
        try {
            await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))
            socketServer.emit('actualizarProductos', products)
        } catch (err) {
            console.error("Error al eliminar el producto:", err)
        }
    })

    socket.emit('actualizarProductos', products) 

    async function getProducts() {
        try {
            const data = await fs.readFile('../backend/src/productos.json', 'utf-8')
            return JSON.parse(data)
        } catch (err) {
            console.error(err)
            throw new Error('Error interno de servidor')
        }
    }
})




export { socketServer }
