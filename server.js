const path=require('path');
const express =require('express');
const socket=require('socket.io');
const http=require('http');



const publicpath=path.join(__dirname , '/public');
const port=process.env.PORT||3000;

var app=express();
var server=http.createServer(app);
var io=socket(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{       
console.log('new user connected');
socket.emit('newMessage',{
	from:'Manas Gupta',
	text:'Hey.I am on server side',
	createdAt:632
});
socket.on('createMessage',(Mess)=>{
	console.log('Message created',Mess);
})
 
socket.on('disconnect',()=>{
       console.log('User was Disconnected');
       });
});


server.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});