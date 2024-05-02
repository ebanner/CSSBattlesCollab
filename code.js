//
// Text field accessors
//

function getEditorView() {
    let cmEditorElement = document.querySelector(".cm-editor") // Or whatever query you need
    let editorView = cmEditorElement.querySelector(".cm-content").cmView.view
    return editorView
}


function getLength() {
    editorView = getEditorView()
    length = editorView.viewState.state.doc.length
    return length
}


function clearTextField() {
    editorView = getEditorView()
    editorView.dispatch({
        changes: {from: 0, to: getLength(editorView), insert: ""}
    })
}


function setTextField(text) {
    editorView = getEditorView()
    clearTextField(editorView)

    editorView.dispatch({
        changes: {from: 0, insert: text}
    })
}


function getText() {
    editorView = getEditorView()
    text = editorView.viewState.state.doc.toString()
    return text
}


//
// Slider accessors
//

function getSliderElement() {
    sliderElement = document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--scrollable.container__item--output > div.item__content > div.Preview_preview__pMaO6 > div > div:nth-child(1)')
    return sliderElement
}


function getSliderWidth() {
    sliderElement = getSliderElement()
    return sliderElement.style.width
}


function setSliderWidth(newWidth) {
    // newWidth = '25%'

    sliderElement = getSliderElement()
    sliderElement.style.width = newWidth
}


//
// Slider label accessors
//

function getSliderLabelElement() {
    sliderLabelElement = document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--scrollable.container__item--output > div.item__content > div.Preview_preview__pMaO6 > div > div.Preview_previewDistance__bcOmJ')
    return sliderLabelElement
}


function getSliderLabelNumber() {
    sliderLabelElement = getSliderLabelElement()
    sliderLabelNumber = sliderLabelElement.style.left
    return sliderLabelNumber
}


function setSliderLabelNumber(newNumber) {
    // newNumber = 295

    sliderLabelElement = getSliderLabelElement()
    sliderLabelElement.style.left = `${newNumber}px`
    sliderLabelElement.textContent = newNumber
}


function getSlider() {
    sliderWidth = getSliderWidth()
    sliderLabelNumber = getSliderLabelNumber()
    return {
        'width': sliderWidth,
        'labelNumber': sliderLabelNumber
    }
}


function setSlider(sliderInfo) {
    // sliderInfo = {width: '69%', labelNumber: '276px'}
    
    setSliderWidth(sliderInfo.width)
    setSliderLabelNumber(sliderInfo.labelNumber)
}


//
// WEBSOCKETS
//

async function initializeWebSocketConnection(serverURL) {
    //
    // Socket stuff
    //

    // Create a new script element
    const script = document.createElement('script');

    // Set the src attribute to the Socket.IO CDN URL
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js';

    // Set integrity and crossorigin attributes for security (optional)
    script.integrity = 'sha512-q/dWJ3kcmjBLU4Qc47E4A9kTB4m3wuTY7vkFJDTZKjTs8jhyGQnaUrxa0Ytd0ssMZhbNua9hE+E7Qv1j+DyZwA==';
    script.crossOrigin = 'anonymous';

    // Append the script element to the document body to load the library
    document.body.appendChild(script);

    // Sleep for a second for the JS script to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    socket = io(serverURL);

    console.log(socket)
    // socket.send('Hello, server!');

    return socket
}


//
// EVENT LISTENERS
//

function getTextFieldElement() {
    textFieldElement =  document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--main.container__item--editor > div.Editor_editor__32JYa > div.cm-theme > div > div.cm-scroller > div.cm-content.cm-lineWrapping')
    return textFieldElement
}


function initializeEventListeners(socket) {
    //
    // TEXT FIELD STUFF
    //

    var TEXT_FIELD_LOCK = false;


    console.log(socket)
    socket.on('text_changed', function (response) {
        console.log('Received response from server:', response);
        responseJson = JSON.parse(response)
        text = responseJson.text
        TEXT_FIELD_LOCK = true;
        console.log('SET TEXT_FIELD_LOCK', TEXT_FIELD_LOCK)
        setTextField(text)
    });


    var textFieldChangedCallback = function(mutationsList, observer) {
        console.log('IN CALLBACK TEXT_FIELD_LOCK', TEXT_FIELD_LOCK);
        if (TEXT_FIELD_LOCK) {
            TEXT_FIELD_LOCK = false;
            return;
        }

        for (var mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                console.log('Text content changed:', mutation);
                console.log('Target DOM element:', mutation.target);
                // Your code to handle the text content change here
                text = getText()
                request = JSON.stringify({'text': text})
                socket.send(request);
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
}


//
// Main
//

// SERVER_URL = 'https://0.0.0.0:5000'
SERVER_URL = '<SERVER_URL>'
socket = await initializeWebSocketConnection(SERVER_URL)
initializeEventListeners(socket)

