
const socket = io()
let user;
let chatBox = document.getElementById("chatBox")

Swal.fire ({
    title: "Ingresa tu nombre de usuario",
    input: "text",
    text: "tu nombre", 
    inputValidator: (value) => {
        return !value && "Tenes que ingresar tu nombre de usuario para continuar"
    },
    allowOutsideClick:false,
}).then (result => {
    user = result.value
    console.log(user)
})

chatBox.addEventListener("keyup", evt => {
    if(evt.key === "Enter"){
        if (chatBox.value.trim().length > 0){
            socket.emit("message", {user:user, message: chatBox.value})   
            console.log(chatBox.value)
            chatBox.value = ""  
    }
}})

socket.on("messageLogs", data => {
    let log = document.getElementById("messageLogs")
    let messages = ""
    console.log(messages)
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}</br>`
    })
    log.innerHTML = messages
})
