import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import { useState } from "react";
import axiosInstance from "../config/axios.instance";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import InputErrorMessage from "../components/ui/InputErrorMessage";

interface IFormInput {
    identifier: string;
    password: string;
}

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({resolver: yupResolver(loginSchema)});
    
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true);
        try {
            const {status, data: resData} = await axiosInstance.post("/auth/local/", data);
            if (status === 200) {
                toast.success(
                    "You will navigate to the Home page after 2 seconds.",
                    {
                        position: "bottom-center",
                        duration: 1500,
                        style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                        },
                    }
                )};
            localStorage.setItem("loggedInUser", JSON.stringify(resData));
            setTimeout(() => {
                location.replace("/");
            }, 2000);
        } catch (error) {
            const objError = error as AxiosError<IErrorResponse>;
            toast.error(
                    `${objError.response?.data.error.message}`,
                    {
                        position: "bottom-center",
                        duration: 1500,
                        style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                        },
                    }
                )
        } finally {
            setIsLoading(false);
        }
    };
    // Renders
    const renderLoginForm = LOGIN_FORM.map(
            ({ name, placeholder, type, validation }, idx) => {
            return (
                <div key={idx} className="space-y-0.5">
                    <Input type={type} placeholder={placeholder} {...register(name, validation)}/>
                    {errors[name]?.message && <InputErrorMessage msg={errors[name].message}/>}
                </div>
            );
        }
    );

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl font-semibold">
                Login to get access!
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {renderLoginForm}    
                <Button fullWidth isLoading={isLoading}>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;