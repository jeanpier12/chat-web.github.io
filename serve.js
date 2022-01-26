//. path nos permite poder manejar las rutas tanto relativas como absolutas de 
//nuestra PC y de nuestro proyecto.

const path= require('path')
var cors = require("cors");
const express = require('express');
const app=express();


 const server=app.listen(3000, () => {
    console.log('se conecto al puerto  3000');
});


 // configurando la plantilla ejs 
 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views'));

 //servidor estatico muestras los archivos exatamente como estan 
 //aca le estamos diciendo que  de la carpeta raiz entre a clientes y hay estaran nuestros 
 //archivos estaticos cuando queremos enlasar desde un archivo html o ejs los archivos estaticos 
 //solo debemos colocar el nombre de los archivos porque este codigo nos esta diriguiendo adentro de la carpeta cliente 
 //y nosotros solo debemos acceder al archivo
app.use(express.static(path.join(__dirname ,'client')));

//rutas

app.get('/', (req, res) => {
    res.render('indesx')
});
//codigo para mostrar html
// app.get('/',(req,res)=>{

//     res.sendFile(path.resolve(__dirname,'indesx.html'))
// })
//la libreria socket.io constatemente esta conectandose 
//a un servidor para encontrar algun cambio que sucede en 
//el servidor para mostrar a un cliente por eso sirve para 
// hacer aplicaciones en tiempo real
const io=require('socket.io')(server,{
    cors:{

origin:"http://192.168.0.103:5500",
methods:["GET" , "POST"],
allowedHeaders:["my-custom-header"],
Credentials:true
}
});
// on hace refenrencia a trabajar con eventos
//cuando existe una coneccion manda y emite un mensaje al cliente y servidor
io.on('connection',(socket)=>{
    console.log('usuario conectado');
    //emit funciónpara mandar eventos con un nombre y tambien puede mandar un 
    //valor o objeto para mandar un mensaje
    socket.emit('message','saludar');

    socket.on('disconnect',()=>{
        console.log('usuario desconectado');
    })
    //aca le estamos diciendoq ue si recibe un evento llamado chatmsg si tambien manda un valos 
    // guardarlo en el paramero msg que ejecute el siguiente codigo 
    socket.on('chatmsg',msg => {
        //aca estas mandando un evento llamado mensaje con un parametro 
        io.emit('message', msg);
    })
})