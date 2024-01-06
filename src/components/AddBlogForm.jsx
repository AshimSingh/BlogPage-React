import { CKEditor } from '@ckeditor/ckeditor5-react'
import 'ckeditor5-custom-build/build/ckeditor'
import { Button, Form, Input, Select, Image, Checkbox } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/Categories/categoriesSlice'

// import { Context } from '@ckeditor/ckeditor5-core';
// import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
// import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

// CKEditor configuration options
const editorConfiguration = {
    // plugins: [ Paragraph, Bold, Italic, Essentials ],
    toolbar: [
        'bold',
        'italic',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'link',
        'image',
    ],
}
import SelectMedia from '../components/SelectMedia'
import FormItem from 'antd/es/form/FormItem'
import autoGenerateSlug from '../utils/autoGenerateSlug'


const AddBlogForm = ({ onFinishFunction, data = {} }) => {
    const [form] = Form.useForm()
    const layout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 24,
        },
    }

    const onFinish = (values) => {
        if (values.tags) {
            var array = values.tags.split(' ')
            values.tags = array
        }
        // console.log(values, 'finished data')
        onFinishFunction(values)
        // navigate('/')
       
    }

    // Select option for category
    const dispatch = useDispatch()
    const [searching, setSearching] = useState(false)

    useEffect(() => {
        dispatch(getCategories({}))    
    }, [])

    const categoriesData = useSelector(
        (state) => state.categories.data
    )

    const options = categoriesData.map((category) => ({
        label: category.title,
        value: category._id,
    }))

    const onSearch = (value) => {
        if (value.length > 3) {
            dispatch(
                getCategories({
                    url: `/blogs/categories?search=${value}&&limit=9`,
                })
            )
            setSearching(true)
            // setSearching(false)
        }
    }
    const [thumbnailData, setThumbnailData] = useState({}) // Initialize state for thumbnail data

    // Function to set the selected media as the thumbnail
    const setMedia = (value) => {
        setThumbnailData(value) // Update the thumbnailData state
        form.setFieldsValue({
            thumbnail: value._id, // Set the 'thumbnail' field in the form to the selected media's ID
        })
    }
    // to set data in edit form
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            // console.log(data, 'this data')
            form.setFieldsValue({
                title: data.title,
                content: data.content,
                categories: data.categories._id,
                tags: data.tags,
                author: data.author._id,
                thumbnail: data.thumbnail._id,
                slug: data.slug,
                featured: data.featured,
                published: data.published,
                timetoRead: data.timetoRead,
            })
            if (data?.thumbnail) {
                setMedia(data.thumbnail)
            }
        }
    }, [data])
    const formItemLayout = {
        labelCol: {
            span: 14,
        },
        wrapperCol: {
            span: 14,
        },
    }
    //featured or not
    const [checkBoxFeatured, setFeatured] = useState(false)
    const onCheckboxChange = () => {
        setFeatured(!checkBoxFeatured)
    }
    //autogenerate Slug feature
    const onTitleChange = (e) => {
        var title = e.target.value
        var slug = autoGenerateSlug(title)
        form.setFieldsValue({
            slug: slug, // Use setFieldsValue to update the form field value
        })
    }
    const blogError = useSelector((state) => state.blogs.error)
    useEffect(() => {}, [searching, checkBoxFeatured])
    return (
        <div className="w-full flex flex-col items-center">
            <div className="lg:w-[70%] md:w[90%] m-2 w-full px-3  min-h-screen ">
                <Form
                    layout="vertical"
                    {...layout}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item name="author"></Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Title is required',
                            },
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <Input onChange={onTitleChange} />
                    </Form.Item>
                    <Form.Item
                        label="Content"
                        name="content"
                        className='blog_div'
                        rules={[
                            {
                                required: true,
                                message: 'Content is required',
                            },
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            data={form.content}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                form.setFieldsValue({
                                    content: data,
                                })
                            }}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                                editor.ui.view.editable.element.style.minHeight ='300px'
                            } }
                            onBlur={ ( event, editor ) => {
                                editor.ui.view.editable.element.style.minHeight ='300px'
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                editor.ui.view.editable.element.style.minHeight ='300px'
                                console.log( 'Focus.', editor );
                            } }
                        />
                    </Form.Item>
                    <Form.Item
                        name="categories"
                        label="Category"
                        rules={[
                            {
                                required: true,
                                message: 'Category is required',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a Category"
                            optionFilterProp="children"
                            onSearch={onSearch}
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Tags"
                        name="tags"
                        rules={[
                            {
                                max: 350,
                                message:
                                    'Too long maximum number of character is 350',
                            },
                            {
                                min: 5,
                                message:
                                    'Too short minimum number of character is 5',
                            },
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                    {/* Display thumbnail if selected */}
                    {Object.keys(thumbnailData).length > 0 ? (
                        <Image
                            height={200}
                            src={thumbnailData.image_url}
                            fallback={
                                import.meta.env.VITE_DEFAULT_IMG
                            }
                        />
                    ) : (
                        ''
                    )}
                    <Form.Item label="Thumbnail" name="thumbnail">
                        {/* Custom media selection component */}
                        <SelectMedia setMedia={setMedia} />
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
                        validateStatus={blogError ? 'error' : null}
                        help={
                            blogError
                                ? 'Try unique slug. Hint: add unique characters'
                                : null
                        }
                    >
                        <Input value={form.slug} />
                    </Form.Item>
                    <div className="flex">
                        <Form.Item
                            valuePropName="checked"
                            name="featured"
                            onChange={onCheckboxChange}
                        >
                            <Checkbox>Featured</Checkbox>
                        </Form.Item>
                        <Form.Item
                            valuePropName="checked"
                            name="published"
                        >
                            <Checkbox>Publish</Checkbox>
                        </Form.Item>
                    </div>
                    {checkBoxFeatured ? (
                        <FormItem
                            name="priority"
                            label="Priority No"
                            rules={[
                                {
                                    required: checkBoxFeatured,
                                    message:
                                        'Priority no is required to be featured blog',
                                },
                            ]}
                        >
                            <Input />
                        </FormItem>
                    ) : null}
                    <Form.Item
                        label="Time To Read"
                        name="timetoRead"
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
                        <Input placeholder="Ex 5 mins" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-blue-500"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AddBlogForm
