import express from "express"   
import { body, validationResult } from 'express-validator'
import fs from 'fs/promises'
const viewsRouter = express.Router()
import { socketServer } from "../src/app.js"

const getProducts = async () => {
   try {
       const data = await fs.readFile("../backend/src/productos.json", "utf-8")
       return JSON.parse(data)
   } catch (err) {
       console.error(err)
       throw new Error('Error interno de servidor')
   }
}


viewsRouter.get('/realtimeproducts', async (req, res) => {
   try {
       const products = await getProducts()
       res.render('realTimeProducts', { products })  
   } catch (err) {
       console.error(err)
       res.status(500).json({ error: 'Error interno del servidor' })
   }
})

viewsRouter.post('/realtimeproducts', [
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
       const products = await getProducts()
       const { title, description, price, status, stock, category } = req.body
       const newStatus = status || true

       const id = products.length > 0 ? products[products.length - 1].id + 1 : 1
       const newProduct = { id, title, description, price, status: newStatus, stock, category }

       products.push(newProduct)
       await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))
       res.json(newProduct)
       socketServer.emit('actualizarProductos', products)
   } catch (err) {
       console.error(err)
       res.status(500).json({ error: 'Error interno del servidor' })
   }
})

viewsRouter.delete('/realtimeproducts/:pid', async (req, res) => {
   try {
       let products = await getProducts()
       const idProducto = parseInt(req.params.pid, 10) 
       products = products.filter(p => p.id !== idProducto)

       await fs.writeFile('../backend/src/productos.json', JSON.stringify(products, null, 2))
       socketServer.emit('actualizarProductos', products)
       res.status(200).json({ message: 'Producto eliminado exitosamente' })
   } catch (err) {
       console.error(err)
       res.status(500).json({ error: 'Error interno de servidor' })
   }
})

export default viewsRouter
