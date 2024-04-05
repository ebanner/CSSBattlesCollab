initializeWebSocketConnection()

socket = io('http://127.0.0.1:5000');

document.addEventListener('mousemove', handleMouseMove);

// Send a message to the server
const message = 'Hello, server!';
socket.send(message);


// Receive messages
socket.on('server_response', function (response) {
    console.log('Received response from server:', response);
});

