;(function (e) {
    const r = (e['af'] = e['af'] || {})
    r.dictionary = Object.assign(r.dictionary || {}, {
        '%0 of %1': '%0 van %1',
        'Block quote': 'Verwysingsaanhaling',
        Bold: 'Vet',
        Cancel: 'Kanselleer',
        Clear: '',
        Code: 'Bronkode',
        Italic: 'Kursief',
        'Remove color': 'Verwyder kleur',
        'Restore default': 'Herstel verstek',
        Save: 'Stoor',
        'Show more items': 'Wys meer items',
        Strikethrough: 'Deurstreep',
        Subscript: 'Onderskrif',
        Superscript: 'Boskrif',
        Underline: 'Onderstreep',
    })
    r.getPluralForm = function (e) {
        return e != 1
    }
})(
    window.CKEDITOR_TRANSLATIONS ||
        (window.CKEDITOR_TRANSLATIONS = {})
)
