import toast from "react-hot-toast";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
    const { pathname } = useLocation();
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const onLogout = () => {
            localStorage.removeItem(storageKey);
            setTimeout(() => {
            location.replace(pathname);
            toast.success(
                    "Loggedout Succssed.",
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
        }, 1500);
    };
    return (
        <nav className="mx-auto mt-7 mb-20 px-3 py-5 rounded-md bg-gray-100">
            <ul className="flex items-center justify-between">
                <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/" className="hover:text-indigo-500 transition">Home</NavLink>
                </li>
                {userData ? (
                <div className="flex items-center text-indigo-600 space-x-4">
                    <li className="duration-200 text-lg">
                    <NavLink to="/todos" className="hover:text-indigo-400 transition">todos</NavLink>
                    </li>
                    <li className="duration-200 text-lg">
                    <NavLink to="/profile" className="hover:text-indigo-400 transition">Profile</NavLink>
                    </li>
                    <button
                    className="bg-indigo-500 text-white p-2 rounded-md cursor-pointer hover:text-indigo-500 hover:bg-white transition-all"
                    onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
                ) : (
                <p className="flex items-center space-x-3">
                    <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/register">Register</NavLink>
                    </li>
                    <li className="text-black duration-200 font-semibold text-lg">
                    <NavLink to="/login">Login</NavLink>
                    </li>
                </p>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;