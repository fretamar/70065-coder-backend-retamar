<h1 align="center">
  <p align="center">1ra Pre-Entrega Backend avanzado 70065 - Francisco Retamar</p>
  <img src="https://res.cloudinary.com/hdsqazxtw/image/upload/v1695043577/nkjgl8ahhhxap6rjrdtz.jpg" alt="Backend Coderhouse"></a>
</h1>

## 1ra Pre-Entrega

  Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts.

## Capturas de POSTMAN funcionando con los métodos solicitados

GET /products
[GET productos](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get.png)

GET /products/:pid
[GET productos por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-get-pid.png)

POST /products
[POST nuevos productos](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-post.png)

DELETE /products/:pid
[DELETE producto por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/products-delete.png)

GET /carts
[GET productos en el carrito](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get.png)

GET /carts/:cid
[GET producto en carrito por id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-get-cid.png)

POST /:cid/product/:pid
[POST producto a carrito con id](https://raw.githubusercontent.com/fretamar/70065-coder-backend-retamar/6b45cc872f9c0a6710f3fd2721fbbbc2620cac74/assets/carrito-post.png)

