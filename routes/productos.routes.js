import { Router } from 'express'
const productosRouter = Router()
import productModel from '../src/models/product.model.js'
import mongoose from 'mongoose'

productosRouter.get('/products', async (req, res) => {
    try {
        const { limit = 10, query = '', sort = 'asc' } = req.query
        const queryLimit = parseInt(limit, 10)
        const sortOrder = sort === 'asc' ? 1 : -1

        const aggregationPipeline = []
        if (query) {
            aggregationPipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: query, $options: 'i' } },
                        { description: { $regex: query, $options: 'i' } },
                        { category: { $regex: query, $options: 'i' } },
                    ]
                }
            })
        }
        aggregationPipeline.push({
            $sort: { price: sortOrder }
        })
        aggregationPipeline.push({
            $limit: queryLimit
        })

        const products = await productModel.aggregate(aggregationPipeline)
        res.send({ result: "success", payload: products })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})


productosRouter.get('/products/:pid', async (req, res) => {
    try {
        let products = await productModel.findById(req.params.pid)
        if (!products) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
        res.send({ result: "success", payload: products })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.post('/products', async (req, res) => {
    try {
        let { title, description, price, stock, category } = req.body
        if (!title || !description || !price || !stock || !category) {
            res.send({ status: "error", error: "Faltan parametros" })
        }
        let result = await productModel.create({ title, description, price, stock, category })
        res.send({ result: "success", payload: result })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.put('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const productoModificado = req.body
        if (!productoModificado.title || !productoModificado.description || !productoModificado.price || !productoModificado.stock || !productoModificado.category) {
            return res.status(400).send({ status: "error", error: "Faltan completar datos del producto" })
        }
        if (!mongoose.isValidObjectId(pid)) {
            return res.status(400).send({ status: "error", error: "ID no válido" })
        }
        const result = await productModel.findByIdAndUpdate(pid, productoModificado, {
            new: true,
            runValidators: true
        })
        if (!result) {
            return res.status(404).send({ status: "error", error: "No se encontró el producto" })
        }
        res.send({ result: "success", payload: result })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

productosRouter.delete('/products/:pid', async (req, res) => {
    try {
        let { pid } = req.params
        let result = await productModel.deleteOne({ _id: pid })
        res.send({ resultado: "success", payload: result })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno de servidor' })
    }
})

export default productosRouter