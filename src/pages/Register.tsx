import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { useForm, type SubmitHandler } from "react-hook-form";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
    console.log(errors)
    // Renders
    const renderRegisterForm = REGISTER_FORM.map(
            ({ name, placeholder, type, validation }, idx) => {
            return (
                <div key={idx}>
                    <Input type={type} placeholder={placeholder} {...register(name, {required: true, minLength: 5})}/>
                    {errors.username && errors.username.type === "required" && <InputErrorMessage msg="user name is required!"/>}
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