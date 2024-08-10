// Importar el modulo de Node(fs)

const fs = require("fs")

class ProductManager {

//contructor](//contructor%60%60%60)

    constructor(filePath) {

        this.path = filePath

        this.initializeFile()

        this.nextId = this.getNextId() // Inicializa el ID basandose en los productos existentes

    }

// Inicializacion del archivo

    initializeFile() {

        if (!fs.existsSync(this.path)) {

            fs.writeFileSync(this.path, JSON.stringify([]))

        }

    }

// Funcion incrementar el ID

    getNextId() {

        const products = this.getProductsFromFile()

        if (products.length === 0) {

            return 1

        }

        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0)

        return maxId + 1

    }

// Metodo para agregar productos

    addProduct(product) {

        const products = this.getProductsFromFile()

        product.id = this.nextId

        this.nextId += 1

        products.push(product)

        this.saveProductsToFile(products)

    }

// Metodo de devuelva todos los productos

    getProducts() {

        return this.getProductsFromFile()

    }

// Metodo que devuelva solo un producto por ID

    getProduct(id) {

        const products = this.getProductsFromFile()

        return products.find(product => product.id === id)

    }

// Metodo para actualizar un producto por ID

    updateProduct(id, updatedFields) {

        const products = this.getProductsFromFile()

        const index = products.findIndex(product => product.id === id)

        if (index !== -1) {

            products[index] = { ...products[index], updatedFields }

            this.saveProductsToFile(products)

        }

    }

// Metodo para eliminar un producto por ID

    deleteProduct(id) {

        let products = this.getProductsFromFile()

        products = products.filter(product => product.id !== id)

        console.log(products)

        this.saveProductsToFile(products)

    }

// Metodo para leer el archivo y que devuelva los productos

    getProductsFromFile() {

        const data = fs.readFileSync(this.path, "utf8")

        return JSON.parse(data)

    }

// Metodo para guardar los productos en un archivo

    saveProductsToFile(products) {

        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))

    }

}

const manager = new ProductManager('products.json')

// Añadir un producto

/* manager.addProduct({

    title: "Producto A",

    description: "Descripcion del producto A",

    price: 1000,

    code: "ABC123",

    stock: 10

}) */

/*

manager.addProduct({

    title: "Producto B",

    description: "Descripcion del producto B",

    price: 1500,

    code: "ABC1234",

    stock: 20

})

manager.addProduct({

    title: "Producto C",

    description: "Descripcion del producto C",

    price: 2000,

    code: "ABC12345",

    stock: 30

}) */

// obtener todos los productos

/* const allProducts = manager.getProducts()

console.log(allProducts) */

// manager.deleteProduct(1)

manager.updateProduct(1, { price: 9000, stock: 1 })




//--------------------------------------------------------------------

import crypto from 'crypto'

class UsersManager {

    static Usuarios = []

    static CrearUsuario(usuario) {
        const hashedPassword = crypto.createHash("sha256").update(usuario.password).digest("hex")

        const newUser = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            username: usuario.username,
            password: hashedPassword
        }

        this.Usuarios.push(newUser)

    }

    static MostrarUsuarios() {
        this.Usuarios.forEach(usuario => {
            console.log(`Nombre: ${usuario.nombre}, Apellido: ${usuario.apellido}, Nombre de usuario: ${usuario.username}`)
        })
    }

    static ValidarUsuario(username, password) {
        const usuario = this.Usuarios.find(u => u.username === username)

        if (!usuario) {
            console.log("Error, usuario no encontrado.")
            return
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        if (usuario.password === hashedPassword) {
            console.log("Usuario logueado con exito")
        } else {
            console.log("Error en la contraseña")
        }
    }
}

UsersManager.CrearUsuario({
    nombre: "Beltran",
    apellido: "Subat",
    username: "bsubat",
    password: "123123"
})

UsersManager.CrearUsuario({
    nombre: "Alfonsina",
    apellido: "Subat",
    username: "asubat",
    password: "456456"
})

UsersManager.MostrarUsuarios()
UsersManager.ValidarUsuario("bsubat", "abcabc")
UsersManager.ValidarUsuario("asubat", "456456")