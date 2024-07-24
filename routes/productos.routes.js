import { Router } from 'express'
import fs from 'fs/promises'
import { body, validationResult } from 'express-validator'
const productosRouter = Router()

const productos = async () => {
    try {
        const data = await fs.readFile("../backend/src/productos.json", "utf-8")
        return JSON.parse(data)
    } catch (err) {
        console.error(err)
        throw new Error('Error interno de servidor')
    }
}

productosRouter.get('/products', async (req, res) => {
    try {
        const products = await productos()
        const limit = req.query.limit

        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.get('/products/:pid', async (req, res) => {
    try {
        const products = await productos()
        const id = req.params.pid
        const product = products.find(product => product.id === parseInt(id))

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.post('/products', [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isNumeric().withMessage('El stock debe ser un número'),
    body('category').notEmpty().withMessage('La categoría es obligatoria')
], async (req, res) => {
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errors: errores.array() })
    }

    try {
        const products = await productos()
        const { title, description, price, status, stock, category } = req.body
        const newStatus = status || true

        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1
        const newProduct = { id, title, description, price, status: newStatus, stock, category }

        products.push(newProduct)
        await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))

        res.json(newProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.put('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    try {
        let products = await productos()
        const productIndex = products.findIndex(product => product.id === productId)

        if (productIndex !== -1) {
            const { title, description, price, stock, category } = req.body
            products[productIndex] = {
                ...products[productIndex],
                title,
                description,
                price,
                stock,
                category
            }

            await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))
            res.json(products[productIndex])
        } else {
            res.status(404).json({ message: "Producto no encontrado" })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.delete('/products/:pid', async (req, res) => {
    try {
        let products = await productos()
        const idProducto = req.params.pid
        const indiceProducto = products.findIndex(p => p.id === idProducto)

        if (indiceProducto === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }

        products = products.filter(p => p.id !== idProducto)

        await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))

        res.status(200).json({ message: 'Producto eliminado exitosamente' })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
})


export default productosRouter