var socket=io();
		socket.on('connect',function (){
       console.log('connected to server');
     

		socket.emit('createMessage',{
         from:`ram`,
         text:`This is Hari here!!!!`
		});
	});
		

		socket.on('disconnect',function(){
       console.log('Disconnected from server');
       });


		socket.on('newMessage',function(mess){
	 	console.log('newMessage',mess);
	});
