const socketServer = io()
let agregarProductos = document.getElementById("agregarProductos")
let listaDeProductos = document.getElementById("listaDeProductos")

Swal.fire({
    title: "Ingresa tu edad",
    input: "number",
    text: "Edad",
    inputValidator: (value) => {
        const age = Number(value)
        if (!value) {
            return "Tienes que ingresar tu edad"
        } else if (isNaN(age) || age <= 17) {
            return "Tienes que ser mayor de edad para ingresar"
        }
        return null
    },
    allowOutsideClick: false,
}).then(result => {
    user = result.value
    console.log("Bienvenido, puedes ingresar!")
})

agregarProductos.addEventListener("submit", evt => {
    evt.preventDefault() 

    const formData = new FormData(evt.target)
    const product = {}
    formData.forEach((value, key) => {
        product[key] = value
    })

    console.log(product) 

    socketServer.emit('agregarProducto', product)
    agregarProductos.reset()
})

listaDeProductos.addEventListener("click", evt => {
    if (evt.target.classList.contains("eliminarProducto")) {
        const idProducto = parseInt(evt.target.closest('.producto').getAttribute('id'), 10)
        console.log(`Producto con id: ${idProducto} eliminado`)
        socketServer.emit('eliminarProducto', idProducto)
    }
})

socketServer.on('actualizarProductos', (products) => {
    listaDeProductos.innerHTML = ''
    products.forEach(product => {
        const producto = document.createElement('div')
        producto.className = 'producto' 
        producto.setAttribute('id', product.id)
        producto.innerHTML = `
            <p>Name: ${product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Stock: ${product.stock}</p>
            <p>Category: ${product.category}</p>
            <button class="eliminarProducto">Eliminar Producto</button>
        `
        listaDeProductos.appendChild(producto)
    })
})
