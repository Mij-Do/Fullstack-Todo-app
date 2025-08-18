import { useState } from "react";
import Paginator from "../components/ui/Paginator";
import { customQueryHook } from "../hooks";
import type { ITodo } from "../interfaces";

const TodosPage = () => {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // states 
    const [page, setPage] = useState<number>(1);

    // handellers
    const onClickPrev = () => {
        setPage(prev => prev - 1);
    }
    const onClickNext = () => {
        setPage(prev => prev + 1);
    }

    const {isLoading, isFetching, data} = customQueryHook({
            queryKey: [`todos-page-${page}`],
            url: "/todos?pagination[pageSize]=10&pagination[page]=1",
            config: {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`
                }
            }
        });
    if (isLoading) return <div className='space-y-2'>
        {Array.from({length: 3}, (_, idx) => 
        <div key={idx} className='space-y-2'>
            <div className="w-100 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="w-100 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>)}
    </div>;
        
    return (
        <div>
            {data.data.length ? data.data.map((todo: ITodo) => (
                <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                    <p className="w-full font-semibold">
                        {todo.id}- {todo.title}
                    </p>
                </div>
            )) : <h3> No Todos yet! </h3>}

            <Paginator 
                page={page} 
                pageCount={data.meta.pagination.pageCount} 
                total={data.meta.pagination.total} 
                isLoading={isLoading || isFetching} 
                onClickPrev={onClickPrev} 
                onClickNext={onClickNext}
            />
        </div>

    )
}

export default TodosPage;