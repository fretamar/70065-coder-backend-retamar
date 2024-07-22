import express from 'express';
import productosRouter from "../routes/productos.routes.js";
import carritoRouter from "../routes/carrito.routes.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from '../routes/views.router.js'
import { Server } from 'socket.io' 

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', productosRouter);
app.use('/', carritoRouter);

//Handlebars para leer contenido de endpoints
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))


app.use('/', viewsRouter);
const httpServer = app.listen(8080, () => console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer)

let messages = []

socketServer.on('connection', socketServer => {
    console.log("Nuevo cliente conectado")

    socketServer.on('message', data => {
        messages.push(data)
        socketServer.emit("messageLogs", messages)
    }) 
})


