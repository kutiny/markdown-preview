(function init() {
    document.addEventListener('DOMContentLoaded', () => {
        const cmTextArea = document.querySelector('#code');
        const codemirrorInstance = CodeMirror.fromTextArea(cmTextArea, {
            mode: 'markdown',
            theme: 'material-ocean',
        });
        codemirrorInstance.setValue('# Hola');
    })
})();