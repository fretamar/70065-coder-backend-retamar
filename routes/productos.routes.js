import { Router } from 'express';
import fs from 'fs';
const productosRouter = Router();

productosRouter.get('/products', (req, res) => {
    fs.readFile('productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const products = JSON.parse(data);  
        const limit = req.query.limit;

        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    });
});

productosRouter.get('/products/:pid', (req, res) => {
    const id = req.params.pid;

    fs.readFile('productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const products = JSON.parse(data);
        const product = products.find(product => product.id === parseInt(id));

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    });
});

productosRouter.post('/products', (req, res) => {
    const { title, description, price, status, stock, category } = req.body;

    fs.readFile('productos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        const products = JSON.parse(data);
        const id = products.length + 1;
        const newProduct = { id, title, description, price, status, stock, category };
        products.push(newProduct);

        fs.writeFile('productos.json', JSON.stringify(products, null, 2), err => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            res.json(newProduct);

        });
    });
});

export default productosRouter;