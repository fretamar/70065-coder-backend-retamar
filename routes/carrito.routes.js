import { Router } from 'express'
import __dirname from '../src/utils.js'
const carritoRouter = Router()
import cartModel from '../src/models/cart.model.js'
import productModel from '../src/models/product.model.js'

carritoRouter.get('/carts', async (req, res) => {
    try {
        let cart = await cartModel.find()
        res.send({ result: "succes", payload: cart })
    } catch (error) {
        console.error(error)
    }
})

carritoRouter.get('/carts/:cid', async (req, res) => {
    try {
        let cartId = await cartModel.findById(req.params.cid)
        if (!cartId) {
            return res.status(404).json({ error: 'No existe el carrito' })
        }
        res.send({ result: "success", payload: cartId })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
})

carritoRouter.post('/carts', async (req, res) => {
    try {
        const products = await productModel.find()
        const nuevoCarrito = new cartModel({ productos: [] })

        if (req.body.products) {
            for (const { id, quantity } of req.body.products) {
                const product = products.find(p => p._id.toString() === id)
                if (product) {
                    nuevoCarrito.productos.push({ id: product._id, quantity })
                }
            }
        }

        const carritoGuardado = await nuevoCarrito.save()
        res.status(200).json({ message: 'Carrito creado exitosamente', carritoCreado: carritoGuardado })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
})

carritoRouter.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const carrito = await cartModel.findById(req.params.cid)
        if (!carrito) {
            return res.status(404).json({ error: 'No existe el carrito' })
        }

        const producto = await productModel.findById(req.params.pid)
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        const productoCarrito = carrito.productos.find(p => p.id.toString() === req.params.pid)
        if (productoCarrito) {
            productoCarrito.quantity += 1
        } else {
            carrito.productos.push({ id: producto._id, quantity: 1 })
        }

        await carrito.save()
        res.status(200).json({ message: 'Producto agregado al carrito exitosamente', carrito })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

export default carritoRouter