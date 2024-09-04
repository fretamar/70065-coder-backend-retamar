<h1 align="center">
  <p align="center">Entrega final Backend avanzado 70065 - Francisco Retamar</p>
  <img src="https://kinsta.com/es/wp-content/uploads/sites/8/2021/12/back-end-developer-1024x512.png" alt="Backend Coderhouse"></a>
</h1>

## Tabla de Contenidos
1. [Instalación]
2. [Configuración]
3. [Uso]
4. [Estructura del Proyecto]
5. [Desarrollo]
6. [Grabación paginado y filtrado por query params](https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/Pantalla%20proyecto%20final%20Retamar%2070065.mp4)

## Instalación

- Node.js v14.17.0
  
### Dependencias 
   - bootstrap
   - dirname
   - express
   - express-handlebars
   - express-websocket
   - mongodb
   - mongoose
   - mongoose-paginate-v2
   - socket.io
   - sweetalert2
    
### Configuración
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/fretamar/70065-coder-backend-retamar
2. Navegar hacia directorio principal
   ```sh
   cd backend
3. Instalar dependencias
   ```sh
   npm install

### Uso

`PORT`: El puerto en el que la aplicación se ejecutará es: 8080.\
`DB_URI`: mongodb+srv://franretamar:Knd281195.-@cluster0.oj1pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

```sh
npm start
```

### Estructura del proyecto
```
proyecto/
📦src
 ┣ 📂models
 ┃ ┣ 📜cart.model.js
 ┃ ┣ 📜product.model.js
 ┃ ┗ 📜user.model.js
 ┣ 📂public
 ┃ ┗ 📂js
 ┃ ┃ ┗ 📜index.js
 ┣ 📂views
 ┃ ┣ 📂layouts
 ┃ ┃ ┗ 📜main.handlebars
 ┃ ┣ 📜index.handlebars
 ┃ ┗ 📜realtimeProducts.handlebars
 ┣ 📜app.js
 ┗ 📜utils.js
```

### Desarrollo

La persistencia de los datos está hecha en MongoDB.

## Endpoints
GET /realtimeproducts
```
Desde este endpoint accederemos a todos los productos alojados en la base, se podrá filtrar por sort precio (default: asc), limit (default: 10), query (para categoría o titulo, default: "") y paginado.
```
GET /realtimeproducts/:pid
```
Desde este endpoint se puede acceder a un producto a través de su id
```
POST /realtimeproducts
```
Se pueden agregar productos a la lista a través del form que se verán reflejados automáticamente en el navegador.
```
PUT /cart
```
Se pueden agregar productos a un carrito desde el botón de cada producto en la lista del navegador.
```
GET /cart
```
Se pueden visualizar los carritos existentes
```
DELETE /cart/:cid
```
Se pueden eliminar un carrito existe a través de su id
```


**-------------------------------------------------------------------------------------------------------------------------------------------------------------**

## 2da Pre-Entrega

Configurar el proyecto para que trabaje con Handlebars y Websocket.
El mismo deberá mostrar la lista de productos creados hasta el momento, pudiendo crear nuevos productos y también poder eliminar productos existentes.

## Endpoint /realtimeproducts 
[/realtimeproducts](https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts.png?raw=true)
<img src="https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts.png?raw=true" alt="endpoint /realtimeproducts"></a>

## Creación de producto desde form 
[Creación de producto](https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts%20-%20crear%20product.png?raw=true)
<img src="https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts%20-%20crear%20product.png?raw=true" alt="Creacion de producto"></a>

## Visualización en vivo de producto creado
[Producto creado](https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts%20-%20prd%20creado.png?raw=true)
<img src="https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts%20-%20prd%20creado.png?raw=true" alt="Producto creado"></a>

## Visaulización en vivo de producto eliminado 
[Producto eliminado](https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts%20-%20prd%20eliminado.png?raw=true)
<img src="https://github.com/fretamar/70065-coder-backend-retamar/blob/main/assets/realtimeproducts%20-%20prd%20eliminado.png?raw=true" alt="Producto eliminado"></a>


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## 1ra Pre-Entrega

  Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts.

## Capturas de POSTMAN funcionando con los métodos solicitados

## GET /products
[GET productos](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get.png" alt="GET productos"></a>

## GET /products/:pid
[GET productos por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get-pid.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get-pid.png" alt="GET productos por id"></a>

## POST /products
[POST nuevos productos](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-post.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-post.png" alt="POST nuevos productos"></a>

## DELETE /products/:pid
[DELETE producto por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-delete.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-delete.png" alt="DELETE producto por id"></a>

## GET /carts
[GET productos en el carrito](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get.png" alt="GET productos en el carrito"></a>

## GET /carts/:cid
[GET producto en carrito por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get-cid.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get-cid.png" alt="GET producto en carrito por id"></a>

## POST /:cid/product/:pid
[POST producto a carrito con id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-post.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-post.png" alt="POST producto a carrito con id"></a>

