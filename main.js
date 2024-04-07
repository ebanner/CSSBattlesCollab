var TEXT_FIELD_LOCK = false;

socket = io('http://127.0.0.1:5000');

socket.on('text_changed', function (response) {
    console.log('Received response from server:', response);
    TEXT_FIELD_LOCK = true;
    console.log('SET TEXT_FIELD_LOCK', TEXT_FIELD_LOCK)
    getTextFieldElement().innerHTML = response
});

//
// Observe when the text field changes
//

var textFieldCallback = function(mutationsList, observer) {
    console.log('IN CALLBACK TEXT_FIELD_LOCK', TEXT_FIELD_LOCK);
    if (TEXT_FIELD_LOCK) {
        TEXT_FIELD_LOCK = false;
        return;
    }

    for(var mutation of mutationsList) {
        if (mutation.type === 'characterData') {
            console.log('Text content changed:', mutation);
            console.log('Target DOM element:', mutation.target);
            // Your code to handle the text content change here
            var textFieldElement = getTextFieldElement();
            socket.send(textFieldElement.innerHTML);
        }
    }
};

//
// Attach an event handler to text field to broadcast changes
//
var textFieldElement = getTextFieldElement();
var config = { characterData: true, subtree: true };
var observer = new MutationObserver(textFieldCallback);
observer.observe(textFieldElement, config);

