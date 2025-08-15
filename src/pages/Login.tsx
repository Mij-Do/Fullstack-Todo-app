import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM } from "../data";

const Login = () => {

    // Renders
    const renderLoginForm = LOGIN_FORM.map(
        ({ name, placeholder, type, validation }, idx) => {
        return (
            <div key={idx}>
                <Input type={type} placeholder={placeholder} />
            </div>
        );
        }
    );

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center mb-4 text-3xl font-semibold">
                Login to get access!
            </h2>
            <form className="space-y-4">
                {renderLoginForm}    
                <Button fullWidth>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;