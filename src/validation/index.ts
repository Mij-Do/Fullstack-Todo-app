import * as yup from "yup";


export const registerSchema = yup
    .object({
        username: yup.string().required("User Name is Required!").min(5, "User Name should be more than 5 characters!"),
        email: yup.string().required("Email is Required!").matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Email is not valid!"),
        password: yup.string().required("Password is Required!").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{5,}$/, "Password is Weak!").min(5, "Password should be more than 5 characters!"),
    })
    .required()