import * as yup from 'yup'

export const signInSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid Email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum')
        .max(30, 'Too long to be password'),
})

export const signUpSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(4, 'Password is too short - should be 8 chars minimum')
        .max(30, 'Too long to be password'),
    aboutme: yup
        .string()
        .min(5, 'Too short make sure it describes you buddy')
        .max(200, 'Err too long description try to make it short'),
    slug: yup
        .string()
        .min(4, 'Too short to be slug')
        .max(200, 'Too long for slug'),
})
