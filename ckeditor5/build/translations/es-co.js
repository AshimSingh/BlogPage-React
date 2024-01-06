;(function (e) {
    const r = (e['es-co'] = e['es-co'] || {})
    r.dictionary = Object.assign(r.dictionary || {}, {
        '%0 of %1': '%0 de %1',
        'Block quote': 'Cita de bloque',
        Bold: 'Negrita',
        Cancel: 'Cancelar',
        Clear: '',
        Code: 'Código',
        Italic: 'Cursiva',
        'Remove color': 'Quitar color',
        'Restore default': 'Restaurar valores predeterminados',
        Save: 'Guardar',
        'Show more items': 'Mostrar más elementos',
        Strikethrough: 'Tachado',
        Subscript: 'Subíndice',
        Superscript: 'Superíndice',
        Underline: 'Subrayado',
        'Upload in progress': 'Carga en progreso',
    })
    r.getPluralForm = function (e) {
        return e == 1 ? 0 : e != 0 && e % 1e6 == 0 ? 1 : 2
    }
})(
    window.CKEDITOR_TRANSLATIONS ||
        (window.CKEDITOR_TRANSLATIONS = {})
)
