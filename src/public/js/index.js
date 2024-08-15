const socketServer = io()

socketServer.on('connect', () => {
    console.log('Conectado al servidor WebSocket')
})

document.addEventListener('DOMContentLoaded', () => {
    const agregarProductosForm = document.getElementById('agregarProductos')
    if (agregarProductosForm) {
        agregarProductosForm.addEventListener('submit', event => {
            event.preventDefault()

            const product = {
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                price: parseFloat(document.getElementById('price').value),
                stock: parseInt(document.getElementById('stock').value),
                category: document.getElementById('category').value,
            }

            socketServer.emit('agregarProducto', product)

            agregarProductosForm.reset()
        })
    }

    const productList = document.getElementById('listaDeProductos')
    if (productList) {
        productList.addEventListener('click', event => {
            if (event.target.classList.contains('eliminarProducto')) {
                const productId = event.target.dataset.id
                socketServer.emit('eliminarProducto', productId)
            }
        })
    }
})

socketServer.on('actualizarProductos', products => {
    const productList = document.getElementById('listaDeProductos')

    productList.innerHTML = ''

    products.forEach(product => {
        const productDiv = document.createElement('div')
        productDiv.className = 'producto'
        productDiv.id = product._id

        productDiv.innerHTML = `
            <p>Titulo: ${product.title}</p>
            <p>Descripción: ${product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Cantidad: ${product.stock}</p>
            <p>Categoría: ${product.category}</p>
            <button class="eliminarProducto" data-id="${product._id}">Eliminar Producto</button>
            <button class="agregarCarrito" data-id="${product._id}">Agregar a carrito</button>
        `

        productList.appendChild(productDiv)
    })
})
