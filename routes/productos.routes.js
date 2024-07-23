import { Router } from 'express';
import fs from 'fs';
import { body, validationResult } from 'express-validator'
const productosRouter = Router()

productosRouter.get('/products', (req, res) => {
    fs.readFile('../backend/src/productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Error interno del servidor' })
        }

        const products = JSON.parse(data)
        const limit = req.query.limit

        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    });
});

productosRouter.get('/products/:pid', (req, res) => {
    const id = req.params.pid

    fs.readFile('../backend/src/productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Error interno del servidor' })
        }

        const products = JSON.parse(data)
        const product = products.find(product => product.id === parseInt(id))

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    })
})

productosRouter.post('/products', [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria'),
    body('price').isNumeric().withMessage('El precio debe ser un número'),
    body('stock').isNumeric().withMessage('El stock debe ser un número'),
    body('category').notEmpty().withMessage('La categoría es obligatoria')
], (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errors: errores.array() })
    }

    const { title, description, price, status, stock, category } = req.body
    const newStatus = status || true

    fs.readFile('../backend/src/productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Error interno del servidor' })
        }

        const products = JSON.parse(data)
        const id = products.length > 0 ? products[products.length - 1].id + 1 : 1
        const newProduct = { id, title, description, price, status: newStatus, stock, category }
        products.push(newProduct)

        fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Error interno del servidor' })
            }
            res.json(newProduct)
        })
    })
})

productosRouter.put('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid)

    fs.readFile('../backend/src/productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Error interno del servidor' })
        }

        let products = JSON.parse(data)
        const product = products.find(product => product.id === productId)
        if (product !== -1) {
            const { title, description, price, stock, category } = req.body
            products[product] = {
                ...products[product],
                title,
                description,
                price,
                stock,
                category
            }
            fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error interno del servidor' })
                }
                res.json(products[product])
            })
        } else {
            res.status(404).json({ message: "Producto no encontrado" })
        }
    })
})

productosRouter.delete('/products/:pid', (req, res) => {
    const id = req.params.pid

    fs.readFile('../backend/src/productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'Error interno del servidor' })
        }
        const products = JSON.parse(data)
        const product = products.filter(product => product.id !== parseInt(id))
        if (product < products) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }

        fs.writeFile('../backend/src/productos.json', JSON.stringify(product, null, 2), err => {
            if (err) {
                console.error(err)
                return res.status(500).json({ error: 'Error interno del servidor' })
            }
            res.json(product)
        })
    })
})

export default productosRouter