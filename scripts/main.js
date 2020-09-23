(function init() {
    function updateYear(domEl) {
        const date = new Date();
        domEl.textContent = date.getFullYear();
    }

    function download(text) {
        const blob = new Blob([text], {type: 'text/markdown'});
        const link = URL.createObjectURL(blob);
        const domEl = document.createElement('a');
        domEl.href = link;
        domEl.setAttribute('download', `${(new Date).getTime()}.md`);
        domEl.classList.add('imnothere');
        document.body.appendChild(domEl);
        domEl.click();
        document.body.removeChild(domEl);
    }

    /* LOGIC HERE (? */
    document.addEventListener('DOMContentLoaded', function() {
        const MarkdownIt = window.markdownit({
            highlight: function(str, lang) {
                if(lang && hljs.getLanguage(lang)) {
                    try {
                        return '<pre class="hljs"><code>' +
                        hljs.highlight(lang, str, true).value +
                        '</code></pre>';
                    } catch (_) { };
                }
                return '';
            }
        });
        const cmTextArea = document.querySelector('#code');
        const codemirrorInstance = CodeMirror.fromTextArea(cmTextArea, {
            mode: 'markdown',
            theme: 'material-ocean',
        });
        const previewElement = document.querySelector('#preview');
        const downloadButton = document.querySelector('#icon-download');
        const selectAllButton = document.querySelector('#icon-select');
        const copyButton = document.querySelector('#icon-copy');

        updateYear(document.querySelector('#year'));
        codemirrorInstance.on('change', function() {
            const result = MarkdownIt.render(codemirrorInstance.getValue());
            previewElement.innerHTML = result;
        });
        codemirrorInstance.setValue('# Bienvenido a Markdown Preview\n\nEscribe aquí para obtener la vista previa en el panel de la derecha.');

        downloadButton.addEventListener('click', function() { download(codemirrorInstance.getValue()) });
        selectAllButton.addEventListener('click', function() {
            codemirrorInstance.execCommand('selectAll');
        });
        copyButton.addEventListener('click', function() {
            const text = codemirrorInstance.getValue();
            if(navigator.clipboard) {
                navigator.clipboard.writeText(text);
            } else {
                const inp = document.createElement('input');
                inp.classList.add('imnothere');
                inp.value = text;
                inp.select();
                inp.setSelectionRange(0, 9999999999);
                document.execCommand('copy');
            }
        });
    })
})();
