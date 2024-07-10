<h1 align="center">
  <p align="center">1ra Pre-Entrega Backend avanzado 70065 - Francisco Retamar</p>
  <img src="https://kinsta.com/es/wp-content/uploads/sites/8/2021/12/back-end-developer-1024x512.png" alt="Backend Coderhouse"></a>
</h1>

## 1ra Pre-Entrega

  Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts.

## Capturas de POSTMAN funcionando con los métodos solicitados

GET /products
[GET productos](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get.png" alt="GET productos"></a>

GET /products/:pid
[GET productos por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get-pid.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get-pid.png" alt="GET productos por id"></a>

POST /products
[POST nuevos productos](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-post.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-post.png" alt="POST nuevos productos"></a>

DELETE /products/:pid
[DELETE producto por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-delete.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-delete.png" alt="DELETE producto por id"></a>

GET /carts
[GET productos en el carrito](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get.png" alt="GET productos en el carrito"></a>

GET /carts/:cid
[GET producto en carrito por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get-cid.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get-cid.png" alt="GET producto en carrito por id"></a>

POST /:cid/product/:pid
[POST producto a carrito con id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-post.png)
<img src="https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-post.png" alt="POST producto a carrito con id"></a>

