import { Router } from 'express';
import fs from 'fs';
const carritoRouter = Router();

// Ruta para crear un nuevo carrito

carritoRouter.post('/carts', (req, res) => {
    const { id, product } = req.body;
    if (id && product) {

        // Escribir el carrito en el archivo "carrito.json"

        fs.readFile('../backend/src/carrito.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error interno de servidor' });
            }

            const carts = JSON.parse(data);
            carts.push({ id, product });

        fs.writeFile('../backend/src/carrito.json', JSON.stringify(carts, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error interno de servidor' });
            }
            res.json({ id, product });
        });
    });
} else {
    res.status(400).json({ error: 'Se requiere ID y Producto' });
}
});

// Ruta para obtener los productos de carrito


carritoRouter.get('/carts', (req, res) => {
    fs.readFile('../backend/src/carrito.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const cart = JSON.parse(data);  
        const limit = req.query.limit;

        if (limit) {
            res.json(cart.slice(0, limit));
        } else {
            res.json(cart);
        }
    });
});

// Ruta para obtener un carrito por su ID

carritoRouter.get('/carts/:cid', (req, res) => {
    const id = req.params.cid;

    // Leer el archivo "carrito.json"
    
    fs.readFile('../backend/src/carrito.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno de servidor' });
        }
        const carts = JSON.parse(data);
        const cart = carts.find(cart => cart.id ===parseInt(id));
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    });
});

// Ruta para agregar un producto a un carrito

carritoRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const productToAdd = {
        product: productId,
        quantity: 1
    };

    // Leer el archivo "carrito.json"

    fs.readFile('../backend/src/carrito.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno de servidor' });
        }

        const carts = JSON.parse(data);
        const cartIndex = carts.findIndex(cart => cart.id === cartId);

        if (cartIndex !== -1) {
            carts[cartIndex].products.push(productToAdd);

            // Escribir los cambios en el archivo "carrito.json"

            fs.writeFile('../backend/src/carrito.json', JSON.stringify(carts, null, 2), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Error interno de servidor' });
                }
                res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
            });
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    });
});

export default carritoRouter