import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { REGISTER_FORM } from "../data";

const Register = () => {
    // Renders
    const renderRegisterForm = REGISTER_FORM.map(
            ({ name, placeholder, type, validation }, idx) => {
            return (
                <div key={idx}>
                    <Input type={type} placeholder={placeholder}/>
                </div>
            );
        }
    );
    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl font-semibold">
                Register to get access!
            </h2>
            <form className="space-y-4">
                {renderRegisterForm}
                <Button fullWidth>
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;