socket = io('http://127.0.0.1:5000');


//
// TEXT FIELD STUFF
//

var TEXT_FIELD_LOCK = false;


socket.on('text_changed', function (response) {
    console.log('Received response from server:', response);
    TEXT_FIELD_LOCK = true;
    console.log('SET TEXT_FIELD_LOCK', TEXT_FIELD_LOCK)
    getTextFieldElement().innerHTML = response
});


var textFieldChangedCallback = function(mutationsList, observer) {
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
var observer = new MutationObserver(textFieldChangedCallback);
observer.observe(textFieldElement, config);


//
// SLIDER STUFF
//

var SLIDER_LOCK = false;

socket.on('slider_changed', function (response) {
    console.log('Received response from server:', response);
    SLIDER_LOCK = true;
    console.log('SET SLIDER_LOCK', SLIDER_LOCK)
    var slider = JSON.parse(response);
    setSlider(slider)
});

var sliderChangedCallback = function(mutationsList, observer) {
    console.log('IN sliderChangedCallback SLIDER_LOCK', SLIDER_LOCK);
    if (SLIDER_LOCK) {
        SLIDER_LOCK = false;
        return;
    }

    for (var mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            // Style attribute has changed, execute your event handler here
            console.log('Style changed:', mutation);
            // Call your event handler function here
            slider = getSlider()
            sliderSerialized = JSON.stringify(slider)
            socket.send(sliderSerialized);
        }
    }
};


//
// Attach an event handler to slider to broadcast changes
//
var sliderElement = getSliderElement();
var config = { attributes: true };
var observer = new MutationObserver(sliderChangedCallback);
observer.observe(sliderElement, config);

