
 const mensajes = document.getElementById('mensajes');
 const msgFom= document.getElementById('msgFom');
 
   
//esta constante se conctara a suestro servidor 
const socket = io('http://localhost:3000');
///cuando resive un mensaje desde el servidor vamos a esbribir un dato

//el evento mensaje activa  la funcion flecha y data recibe un valor 
socket.on('message',data=>{
    console.log(data);
    //llama a la función y con esta variable que contine un valor 
    agregarMensaje(data);
}) 

function capurar(){
    var input =document.getElementById('cap').value;
   
   console.log(input)
 //aca temgo el formulario cada vez que se genere un evento
 //submit osea que cuando se cargue la paguina  
 //va atener una variable con una función
 
 document.addEventListener('submit', e => {
    //PreventDefault() se utiliza para detener una acción por omisión, utilizada comunmente sobre etiquetas (a) 
    //o botones input:submit .. e. stopPropagation() en cambio detiene la propagación de un evento, con el objetivo de q no se realice otra ejecución u otro listener lo escuche a través del DOM
    e.preventDefault();
    //vamos a emitir este mensaje como cliente cada vez que de clip en el boton
    socket.emit('chatmsg', input);
    document.getElementById('cap').value="";
   
    //una vez que mande el mensaje que limpie elvalor
    // msgFom.msg.value="";
})
}
 
//funció que recibe un parametro
function agregarMensaje(mensaje){
    const html =`<div>${mensaje}</div>`;
    mensajes.innerHTML += html;
}

 