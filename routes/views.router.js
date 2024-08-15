import express from "express"   
const viewsRouter = express.Router()
import { socketServer } from "../src/app.js"
import productModel from "../src/models/product.model.js"
import { paginate } from "mongoose-paginate-v2"

// En tu controlador de `realtimeproducts`
viewsRouter.get('/realtimeproducts', async (req, res) => {
    try {
        let { limit = 10, page = 1, query = '', sort = 'asc' } = req.query

        limit = parseInt(limit, 10)
        page = parseInt(page, 10)
        const sortOrder = sort === 'asc' ? 1 : -1

        console.log({ limit, page, query, sort, sortOrder })

        const filter = {}
        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        }
        const result = await productModel.paginate(filter, {
            page,
            limit,
            sort: { price: sortOrder },
            lean: true
        })
        result.prevLink = result.hasPrevPage ? `/realtimeproducts?page=${result.prevPage}&limit=${limit}&query=${query}&sort=${sort}` : ''
        result.nextLink = result.hasNextPage ? `/realtimeproducts?page=${result.nextPage}&limit=${limit}&query=${query}&sort=${sort}` : ''
        result.isValid = !(page <= 0 || page > result.totalPages)

        res.render('realtimeproducts', {
            productosRealTime: result.docs,
            isValid: result.isValid,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            page: result.page
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})


// Ruta para obtener un producto específico por ID
viewsRouter.get('/realtimeproducts/:pid', async (req, res) => {
    try {
        const productId = req.params.pid

        const product = await productModel.findById(productId).lean()
        if (!product) {
            return res.status(404).render('404', { error: 'Producto no encontrado' })
        }
        res.render('realtimeproducts', {
            productosRealTime: [product],
            isValid: true,
            hasPrevPage: false,
            hasNextPage: false,
            page: 1
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error interno del servidor' })
    }
})

// Ruta para agregar un nuevo producto
viewsRouter.post('/realtimeproducts', async (req, res) => {
    const { title, description, price, status, stock, category } = req.body

    try {
        const newProduct = new productModel({
            title,
            description,    
            price,
            status: status || true,
            stock,
            category
        })

        const savedProduct = await newProduct.save()

        const allProducts = await productModel.find().lean()
        socketServer.emit('actualizarProductos', allProducts)

        res.json(savedProduct)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al crear el producto' })
    }
})

viewsRouter.delete('/realtimeproducts/:pid', async (req, res) => {
    const productId = req.params.pid

    try {
        await productModel.findByIdAndDelete(productId)

        const allProducts = await productModel.find().lean()
        socketServer.emit('actualizarProductos', allProducts)

        res.status(200).json({ message: 'Producto eliminado exitosamente' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al eliminar el producto' })
    }
})

export default viewsRouter