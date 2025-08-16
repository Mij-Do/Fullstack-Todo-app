import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>({resolver: yupResolver(registerSchema)});
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
    console.log(errors)
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
                <Button fullWidth>
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;