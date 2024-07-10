import express from "express";
import productosRouter from "../routes/productos.routes.js";
import carritoRouter from "../routes/carrito.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', productosRouter);
app.use('/', carritoRouter);


app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
});