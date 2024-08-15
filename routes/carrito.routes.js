import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
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
        const carritos = await cartModel.find()
        const products = await productModel.find()
        
        const nuevoCarritoId = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1
        const nuevoCarrito = { id: String(nuevoCarritoId), productos: [] }

        if (req.body.products) {
            for (const { id, quantity } of req.body.products) {
                const product = products.find(p => p.id === id)
                if (product) {
                    nuevoCarrito.products.push({ id, quantity })
                }
            }
        }

        carritos.push(nuevoCarrito)
        await fs.writeFile('../backend/src/carrito.json', JSON.stringify(carritos, null, 2));

        res.status(200).json({ message: 'Carrito creado exitosamente', carritoCreado: nuevoCarrito })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
})

carritoRouter.post('/carts/:cid/product/:pid', async (req, res) => {
    try {
        const carritos = await carrito()
        const products = await productos()
        let carritoId = carritos.find(c => c.id === req.params.cid)

        if (!carritoId) {
            return res.status(404).json({ error: 'No existe el carrito' })
        }

        let productoId = products.find(p => p.id === req.params.pid)

        if (!productoId) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        let productoCarrito = carritoId.products.find(p => p.id === productoId.id)

        if (productoCarrito) {
            productoCarrito.quantity += 1
        } else {
            carritoId.products.push({ id: productoId.id, quantity: 1 })
        }

        await fs.writeFile('../backend/src/carrito.json', JSON.stringify(carritos, null, 2))
        res.status(200).json({ message: 'Producto agregado al carrito exitosamente', carrito: carritoId })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

export default carritoRouter