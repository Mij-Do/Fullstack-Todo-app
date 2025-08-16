import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.instance";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({resolver: yupResolver(registerSchema)});
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true);
        try {
            const {status} = await axiosInstance.post("/auth/local/register", data);
            if (status === 200) {
                toast.success(
                    "You will navigate to the login page after 2 seconds to login.",
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
    const renderRegisterForm = REGISTER_FORM.map(
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
                Register to get access!
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {renderRegisterForm}
                <Button fullWidth isLoading={isLoading}>
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;