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
	from:'Admin',
	text:'Welcome to chat app',
	createdAt:new Date().getTime()
});

socket.broadcast.emit('newMessage',{
	from:'Admin',
	text:'New User joined',
	createdAt:new Date().getTime()
});


socket.on('createMessage',(message)=>{
	console.log('Message created',message);
	
io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
	});
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