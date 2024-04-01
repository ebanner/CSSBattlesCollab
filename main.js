// function getLine(lineDiv) {
//     spans = lineDiv.children
//     characters = Array.from(spans).map(span => span.textContent)
//     line = characters.join("")
//     return line
// }


// function getLines(textFieldElement) {
//     lines = Array.from(textFieldElement.children).map(div => getLine(div))
//     return lines
// }


// function getText(textFieldElement) {
//     lines = getLines(textFieldElement)
//     text = lines.join("\n")
//     return text
// }


function getTextFieldElement() {
    textFieldElement =  document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--main.container__item--editor > div.Editor_editor__32JYa > div.cm-theme > div > div.cm-scroller > div.cm-content.cm-lineWrapping')
    return textFieldElement
}


function setText(getTextFieldElement, textFieldElementText) {
    getTextFieldElement.outerHTML = textFieldElementText
}


function getSliderWidth(sliderElement) {
    return sliderElement.style.width
}


function setSliderWidth(sliderElement, newWidth) {
    // newWidth = '25%'

    sliderElement.style.width = newWidth
}


function getSliderElement() {
    sliderElement = document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--scrollable.container__item--output > div.item__content > div.Preview_preview__pMaO6 > div > div:nth-child(1)')
}


function getSliderLabelLeft(sliderLabelElement) {
    return sliderLabelElement.style.left
}


function setSliderLabelLeft(sliderLabelElement, newLeft) {
    // newLeft = 295

    sliderLabelElement.style.left = `${newLeft}px`
    sliderLabelElement.textContent = newLeft
}


function getSliderLabelElement() {
    sliderLabelElement = document.querySelector('#__next > div.page-wrapper > div.content-wrapper > div.page-content.page-content--no-padding > div > div.container.container--fixed-height > div.container__item.container__item--scrollable.container__item--output > div.item__content > div.Preview_preview__pMaO6 > div > div.Preview_previewDistance__bcOmJ')
    return sliderLabelElement
}


//

textFieldElement = getTextFieldElement()
sliderElement = getSliderElement()
sliderLabelElement = getSliderLabelElement()

text = getText(textFieldElement)

