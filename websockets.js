// Create a new script element
const script = document.createElement('script');

// Set the src attribute to the Socket.IO CDN URL
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js';

// Set integrity and crossorigin attributes for security (optional)
script.integrity = 'sha512-q/dWJ3kcmjBLU4Qc47E4A9kTB4m3wuTY7vkFJDTZKjTs8jhyGQnaUrxa0Ytd0ssMZhbNua9hE+E7Qv1j+DyZwA==';
script.crossOrigin = 'anonymous';

// Append the script element to the document body to load the library
document.body.appendChild(script);

//

var socket = io('http://127.0.0.1:5000');

// Send a message to the server
const message = 'Hello, server!';
socket.send(message);
