const path=require('path');
const express =require('express');
const socket=require('socket.io');
const http=require('http');


const {generateMessage}=require('./utils/message');
const publicpath=path.join(__dirname , '/public');
const port=process.env.PORT||3000;

var app=express();
var server=http.createServer(app);
var io=socket(server);

app.use(express.static(publicpath));

io.on('connection',(socket)=>{       
console.log('new user connected');

socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));;
	

socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));


socket.on('createMessage',(message)=>{
	console.log('Message created',message);
	
io.emit('newMessage',generateMessage(message.from,message.text));
// socket.broadcast.emit('newMessage',{
//    	    from:message.from,
//    		text:message.text,
//    	 	createdAt:new Date().getTime()
//    	});
});
 
socket.on('disconnect',()=>{
       console.log('User was Disconnected');
       });
});


server.listen(port,()=>{
	console.log(`server is up on port ${port}`);
});