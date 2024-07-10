//GET

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.get('/canchas', (req, res) => {
    res.json(canchas)
})

app.get('/usuarios/:username', (req, res) => {
    const userName = req.params.username
    const name = usuarios.find((name) => name.username === userName)
    if (name){
        res.status(200).json(name)
    }else{
        res.status(400).json({message:"Usuario no encontrado"})
    }
})

app.get('/canchas/:id', (req, res) => {
    const canchaId = parseInt(req.params.id)
    const cancha = canchas.find((cancha) => cancha.id === canchaId)
    if (cancha){
        res.status(200).json(cancha)
    }else{
        res.status(400).json({message:"Cancha no encontrada"})
    }
})


//POST

app.post('/usuario', (req, res) => {
    const {username} = req.body
    const {nombre} = req.body
    const {apellido} = req.body
    const {email} = req.body
    const {edad} = req.body
    const {genero} = req.body
    const newUsuario = {username: username, nombre: nombre, apellido: apellido, email: email, edad: edad, genero: genero}
    usuarios.push(newUsuario)
    if(newUsuario){
    res.status(201).json(newUsuario)
    }else{
        res.status(404).json({messsae: "Usuario nuevo no creado"})
    }
})

app.post('/cancha', (req, res) => {
    const {nombre} = req.body
    const {deporte} = req.body
    const {ubicacion} = req.body
    const {precio} = req.body
    const newCancha = {id: canchas.length + 1, nombre: nombre, deporte: deporte, ubicacion: ubicacion, precio: precio}
    canchas.push(newCancha)
    if(newCancha){
    res.status(201).json(newCancha)
    }else{
        res.status(404).json({messsae: "Cancha nueva no creada"})
    }
})


//PUT

app.put('/usuario/:username', (req, res) => {
    const userName = req.params.username
    const name = usuarios.find((name) => name.username === userName)
    if (name){
        const {email} = req.body
        name.email = email
        res.status(200).json(name)
    }else{
        res.status(400).json({message:"Email no modificado"})
    }
})

app.put('/cancha/:id', (req, res) => {
    const canchaId = parseInt(req.params.id)
    const cancha = canchas.find((cancha) => cancha.id === canchaId)
    if(cancha){
        const {precio} = req.body
        cancha.precio = precio
        res.status(200).json(cancha)
    }else{
     res.status(400).json({message:"Precio no modificado"})

    }
})

//DELETE

app.delete('/usuarios/:username', (req, res) => {
    const userName = req.params.username
    usuarios = usuarios.filter((name) => name.username !== userName)
    res.status(200).json({message:`Usuario ${userName} eliminado correctamente`})
})

app.delete('/canchas/:id', (req, res) => {
    const canchaId = parseInt(req.params.id)
    canchas = canchas.filter((cancha) => cancha.id !== canchaId)
    res.status(200).json({message: `Cancha con ID ${canchaId} eliminada correctamente`})
})

