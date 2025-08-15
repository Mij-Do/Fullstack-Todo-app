import Button from './ui/Button';


const TodoList = () => {
    return (
        <div
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
            <p className="w-full font-semibold">
                1- frist
            </p>
            <div className="flex items-center justify-end w-full space-x-3">
                <Button
                    variant={"default"}
                    size={"sm"}
                >
                    Edit
                </Button>
                <Button
                    variant={"danger"}
                    size={"sm"}
                >
                    Remove
                </Button>
            </div>
        </div>
    )
}

export default TodoList;