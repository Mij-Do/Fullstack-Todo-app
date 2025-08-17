import Button from './ui/Button';
import type { ITodo } from '../interfaces';
import { customQueryHook } from '../hooks';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Textarea from './ui/TextArea';
import { useState, type FormEvent } from 'react';


const TodoList = () => {
    const defaultVal = {
        title: '',
        description: ''
    }
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;


    // states
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(defaultVal);


    // Handellers
    const openUpdateModal = (todo: ITodo) => {
        setTodoToEdit(todo);
        setIsOpenUpdate(true);
    }
    const closeUpdateModal = () => {
        setIsOpenUpdate(false);
    }

    const onSubmitUpdate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

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
        <div>
            {data.todos.length ? data.todos.map((todo: ITodo) => (
                <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                    <p className="w-full font-semibold">
                        {todo.id}- {todo.title}
                    </p>
                    <div className="flex items-center justify-end w-full space-x-3">
                        <Button variant={"default"} size={"sm"} onClick={() => openUpdateModal(todo)}> Edit </Button>
                        <Button variant={"danger"} size={"sm"} > Remove </Button>
                    </div>
                </div>
            )) : <h3> No Todos yet! </h3>} 

            {/* update modal */}
            <Modal isOpen={isOpenUpdate} onClose={closeUpdateModal} title='Update Modal'>
                <form className='space-y-2' onSubmit={onSubmitUpdate}>
                    <Input value={todoToEdit.title}/>
                    <Textarea value={todoToEdit.description}/>
                    <div className='flex justify-center space-x-3'>
                        <Button variant={'default'} size={'sm'} className='w-full'>Update</Button>
                        <Button variant={'cancel'} size={'sm'} className='w-full' onClick={closeUpdateModal}>Cancel</Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default TodoList;