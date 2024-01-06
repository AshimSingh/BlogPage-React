/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { Essentials } from '@ckeditor/ckeditor5-essentials'
import { Heading } from '@ckeditor/ckeditor5-heading'
import {
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
} from '@ckeditor/ckeditor5-image'
import { Indent } from '@ckeditor/ckeditor5-indent'
import { Link } from '@ckeditor/ckeditor5-link'
import { List } from '@ckeditor/ckeditor5-list'
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table'
import { TextTransformation } from '@ckeditor/ckeditor5-typing'
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload'
declare class Editor extends ClassicEditor {
    static builtinPlugins: (
        | typeof Autoformat
        | typeof Base64UploadAdapter
        | typeof BlockQuote
        | typeof Bold
        | typeof Essentials
        | typeof Heading
        | typeof Image
        | typeof ImageCaption
        | typeof ImageStyle
        | typeof ImageToolbar
        | typeof ImageUpload
        | typeof Indent
        | typeof Italic
        | typeof Link
        | typeof List
        | typeof MediaEmbed
        | typeof Paragraph
        | typeof Table
        | typeof TableToolbar
        | typeof TextTransformation
    )[]
    static defaultConfig: {
        toolbar: {
            items: string[]
        }
        language: string
        image: {
            toolbar: string[]
        }
        table: {
            contentToolbar: string[]
        }
    }
}
export default Editor
