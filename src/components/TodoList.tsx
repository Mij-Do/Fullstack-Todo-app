import Button from './ui/Button';
import type { ITodo } from '../interfaces';
import { customQueryHook } from '../hooks';


const TodoList = () => {

    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const {isLoading, data} = customQueryHook({
        queryKey: ["todos"],
        url: "/users/me?populate=todos",
        config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            }
        }
    });


    if (isLoading) return <h3> Loading ... </h3>;
    return (
        data.todos.length ? data.todos.map((todo: ITodo) => (
            <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                <p className="w-full font-semibold">
                    {todo.id}- {todo.title}
                </p>
                <div className="flex items-center justify-end w-full space-x-3">
                    <Button variant={"default"} size={"sm"}> Edit </Button>
                    <Button variant={"danger"} size={"sm"} > Remove </Button>
                </div>
            </div>
        )) : <h3> No Todos yet! </h3>
    )
}

export default TodoList;