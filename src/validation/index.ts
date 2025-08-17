import * as yup from "yup";


export const registerSchema = yup
    .object({
        username: yup.string().required("User Name is Required!").min(5, "User Name should be more than 5 characters!"),
        email: yup.string().required("Email is Required!").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email is not valid!"),
        password: yup.string().required("Password is Required!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{5,}$/, "Password is Weak!").min(5, "Password should be more than 5 characters!"),
    })
    .required()

export const loginSchema = yup
    .object({
        identifier: yup.string().required("Email is Required!").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email is not valid!"),
        password: yup.string().required("Password is Required!").min(5, "Password should be more than 5 characters!"),
    })
    .required()


// update validation

export const updateInputValidation = (
    inputs: {
        title: string, 
        description: string,
    }) => {
    const errors = {
        title: '',
        description: '',
    }

    if (!inputs.title.trim() || inputs.title.length < 5 || inputs.title.length > 20) {
        errors.title = 'TheTitle characters should have more than 5 && less than 20!';
    }
    if (!inputs.description.trim() || inputs.description.length < 10 || inputs.description.length > 90) {
        errors.description = 'The Description characters should have more than 10 && less than 90!';
    }

    return errors;
}