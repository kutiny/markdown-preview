(function init() {
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

        codemirrorInstance.on('change', function() {
            const result = MarkdownIt.render(codemirrorInstance.getValue());
            previewElement.innerHTML = result;
        });

    })
})();
