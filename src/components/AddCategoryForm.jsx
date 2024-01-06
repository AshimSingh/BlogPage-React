import 'ckeditor5-custom-build/build/ckeditor' // Import CKEditor for use in the component
import {
    Button,
    Checkbox,
    Form,
    Input,
    ConfigProvider,
    Image,
} from 'antd' // Import components from the Ant Design library
import { CKEditor } from '@ckeditor/ckeditor5-react' // Import CKEditor component
import ReactHtmlParser from 'react-html-parser' // Import ReactHtmlParser for rendering HTML content

// CKEditor configuration options
const editorConfiguration = {
    toolbar: [
        'bold',
        'italic',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'link',
    ],
}

import { useState } from 'react' // Import React's useState hook
import HtmlParser from 'react-html-parser' // Import the HTML parser function
import { useDispatch } from 'react-redux' // Import useDispatch from Redux for state management
import { createCategory } from '../features/Categories/categoriesSlice' // Import Redux action
import SelectMedia from './SelectMedia' // Import a custom component for media selection

const AddCategory = () => {
    // Initialize state variables using useState

    const dispatch = useDispatch() // Get the Redux dispatch function
    const postData = (values) => {
        dispatch(createCategory({ data: values })) // Dispatch a Redux action to create a category
    }

    return (
        <div className="w-full mt-5 flex justify-center items-center flex-col ">
            {/* Header */}
            {/* if it is edit form set to null other wise show header */}
            <div className="w-full p-3">
                <h1 className="md:text-4xl text-xl">Add Category</h1>
            </div>
            <div className="lg:w-[70%] w-[98%] flex justify-center flex-wrap">
                <CategoryForm onFinishFunction={postData} />
            </div>
        </div>
    )
}
export const CategoryForm = ({
    isEditForm = false,
    onFinishFunction,
}) => {
    const [form] = Form.useForm() // Create a form instance using Form.useForm()
    // Handle form submission
    const onFinish = (values) => {
        console.log('finished data', values)
        onFinishFunction(values)
    }

    // Handle form submission failure
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const [thumbnailData, setThumbnailData] = useState({}) // Initialize state for thumbnail data

    // Function to set the selected media as the thumbnail
    const setMedia = (value) => {
        setThumbnailData(value) // Update the thumbnailData state
        form.setFieldsValue({
            thumbnail: value._id, // Set the 'thumbnail' field in the form to the selected media's ID
        })
    }
    return (
        <>
            {/* Form */}
            <Form
                name="basic"
                className="w-full"
                size="large"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                form={form}
            >
                {/* Form fields */}
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message:
                                'Please provide title of category',
                        },
                        {
                            max: 50,
                            message: 'Too long to be title',
                        },
                        {
                            min: 5,
                            message: 'Title too short',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    className="min-h-[300px]"
                >
                    {/* CKEditor for description */}
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfiguration}
                        data={form.description}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            form.setFieldsValue({
                                description: data,
                            })
                        }}
                        onReady={(editor) => {
                            editor.ui.view.editable.element.style.minHeight =
                                '300px'
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="Slug"
                    name="slug"
                    rules={[
                        {
                            max: 50,
                            message: 'Too long to be title',
                        },
                        {
                            min: 5,
                            message: 'Title too short',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* Display thumbnail if selected */}
                {Object.keys(thumbnailData).length > 0 ? (
                    <Image
                        height={200}
                        src={thumbnailData.image_url}
                        fallback={import.meta.env.VITE_DEFAULT_IMG}
                    />
                ) : (
                    ''
                )}

                <Form.Item label="Thumbnail" name="thumbnail">
                    {/* Custom media selection component */}
                    <SelectMedia setMedia={setMedia} />
                </Form.Item>

                <div className="w-full flex justify-center">
                    <Form.Item>
                        {/* Submit button */}
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}

export default AddCategory
