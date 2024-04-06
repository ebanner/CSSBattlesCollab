//
// Text field
//
function getTextFieldElement() {
    textFieldElement =  document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--main.container__item--editor > div.Editor_editor__32JYa > div.cm-theme > div > div.cm-scroller > div.cm-content.cm-lineWrapping')
    return textFieldElement
}


function setTextFieldElement(textFieldElement, textFieldElementHTML) {
    textFieldElement.outerHTML = textFieldElementHTML
}


//
// Slider
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
// Slider label
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




// Websockets


function initializeWebSocketConnection() {
    // Create a new script element
    const script = document.createElement('script');

    // Set the src attribute to the Socket.IO CDN URL
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js';

    // Set integrity and crossorigin attributes for security (optional)
    script.integrity = 'sha512-q/dWJ3kcmjBLU4Qc47E4A9kTB4m3wuTY7vkFJDTZKjTs8jhyGQnaUrxa0Ytd0ssMZhbNua9hE+E7Qv1j+DyZwA==';
    script.crossOrigin = 'anonymous';

    // Append the script element to the document body to load the library
    document.body.appendChild(script);
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
// Main
//

initializeWebSocketConnection()

