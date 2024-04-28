/* Get the code mirror EditorView */

let cmEditorElement = document.querySelector(".cm-editor") // Or whatever query you need
let editorView = cmEditorElement.querySelector(".cm-content").cmView.view


function getLength(editorView) {
    length = editorView.viewState.state.doc.length
    return length
}


function clearTextField(editorView) {
    editorView.dispatch({
        changes: {from: 0, to: getLength(editorView), insert: ""}
    })
}


function setTextField(editorView, text) {
    clearTextField(editorView)

    editorView.dispatch({
        changes: {from: 0, insert: text}
    })
}

