initializeWebSocketConnection()

socket = io('http://127.0.0.1:5000');

socket.on('server_response', function (response) {
    console.log('Received response from server:', response);
});

// document.addEventListener('mousemove', handleMouseMove);

// Send a message to the server
// socket.send('Hello, server!');

//
// Observe when the text field changes
//

var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type === 'characterData') {
            console.log('Text content changed:', mutation);
            console.log('Target DOM element:', mutation.target);
            // Your code to handle the text content change here
            var textFieldElement = getTextFieldElement();
            socket.send(textFieldElement.outerHTML);
        }
    }
};

//
// Start observing the target node for configured mutations
//
var textFieldElement = getTextFieldElement();
var config = { characterData: true, subtree: true };
var observer = new MutationObserver(callback); // Create an observer instance linked to the callback function
observer.observe(textFieldElement, config);
