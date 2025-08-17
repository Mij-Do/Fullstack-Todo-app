import Button from './ui/Button';
import type { ITodo } from '../interfaces';
import { customQueryHook } from '../hooks';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Textarea from './ui/TextArea';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import axiosInstance from '../config/axios.instance';
import toast from 'react-hot-toast';
import { updateInputValidation } from '../validation';
import InputErrorMessage from "../components/ui/InputErrorMessage";


const TodoList = () => {
    const defaultVal = {
        id: 0,
        title: '',
        description: '',
        documentId: '',
    }
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;


    // states
    const [queryVersion, setQueryVersion] = useState(1);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(defaultVal);
    const [isUpdating, setIsUpdating] = useState(false);
    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });


    // Handellers
    const openUpdateModal = (todo: ITodo) => {
        setTodoToEdit(todo);
        setIsOpenUpdate(true);
    }
    const closeUpdateModal = () => {
        setIsOpenUpdate(false);
    }

    const onSubmitUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = updateInputValidation({
            title: todoToEdit.title,
            description: todoToEdit.description,
        });
        const hasMsgError = Object.values(errors).some(value => value === '') 
                            && Object.values(errors).every(value => value === '');
        if (!hasMsgError) {
            setErrors(errors);
            return;
        }
        setIsUpdating(true);
        try {
            const {status} = await axiosInstance.put(`/todos/${todoToEdit.documentId}`, 
                {data: {title: todoToEdit.title, description: todoToEdit.description}}, {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`
                    }
                })
            if (status === 200) {
                closeUpdateModal();
                setQueryVersion(prev => prev + 1);
                toast.success(
                    "Your Todo is Updated!.",
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
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    }

    const onChangeHandeller = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        // update
        setTodoToEdit({
            ...todoToEdit,
            [name]: value,
        });
        // errors
        setErrors({
            ...errors,
            [name]: '',
        });
    }

    const {isLoading, data} = customQueryHook({
        queryKey: ["todoList", `${queryVersion}`],
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
                    <Input name='title' value={todoToEdit.title} onChange={onChangeHandeller}/>
                    {errors.title && <InputErrorMessage msg={errors.title}/>}
                    <Textarea name='description' value={todoToEdit.description} onChange={onChangeHandeller}/>
                    {errors.description && <InputErrorMessage msg={errors.description}/>}
                    <div className='flex justify-center space-x-3'>
                        <Button variant={'default'} size={'sm'} className='w-full' isLoading={isUpdating}>Update</Button>
                        <Button variant={'cancel'} size={'sm'} className='w-full' onClick={closeUpdateModal}>Cancel</Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default TodoList;