import { Router } from 'express'
import fs from 'fs/promises'
import path from 'path'
import __dirname from '../src/utils.js'

const carritoRouter = Router()

const carrito = async () => {
    try {
        const data = await fs.readFile("../backend/src/carrito.json", "utf-8")
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
        throw new Error('Error interno de servidor')
    }
}
const productos = async () => {
    try {
        const data = await fs.readFile("../backend/src/productos.json", "utf-8")
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
        throw new Error('Error interno de servidor')
    }
}

carritoRouter.get('/carts', async (req, res) => {
    const carritos = await carrito()
    res.json({ carritos })
})

carritoRouter.get('/carts/:cid', async (req, res) => {
    try {
        const carritos = await carrito()
        let carritoId = carritos.find(c => c.id === req.params.cid)

        if (!carritos) {
            return res.status(404).json({ error: 'No existe el carrito' })
        }

        const productosCarrito = carritoId.productos

        res.json({ idCarrito: carritoId.id, productosCarrito })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
})

carritoRouter.post('/carts', async (req, res) => {
    try {
        const carritos = await carrito()
        const products = await productos()
        
        const nuevoCarritoId = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1
        const nuevoCarrito = { id: String(nuevoCarritoId), productos: [] }

        if (req.body.productos) {
            for (const { id, quantity } of req.body.productos) {
                const producto = products.find(p => p.id === id)
                if (producto) {
                    nuevoCarrito.productos.push({ id, quantity })
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