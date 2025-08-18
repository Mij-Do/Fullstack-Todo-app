import { useState, type ChangeEvent } from "react";
import Paginator from "../components/ui/Paginator";
import { customQueryHook } from "../hooks";
import type { ITodo } from "../interfaces";

const TodosPage = () => {
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    // states 
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sort, setSort] = useState<string>("DESC");

    // handellers
    const onClickPrev = () => {
        setPage(prev => prev - 1);
    }
    const onClickNext = () => {
        setPage(prev => prev + 1);
    }

    const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(+e.target.value);
    }

    const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        setSort(e.target.value);
    }

    const {isLoading, isFetching, data} = customQueryHook({
            queryKey: [`todos-page-${page}-${pageSize}-${sort}`],
            url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sort}`,
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
            <div className="flex justify-center space-x-3 mb-10">
                <select 
                    className="p-2 outline-0 border border-indigo-500 rounded-md"
                    value={pageSize}
                    onChange={onChangePageSize}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <select
                    className="p-2 outline-0 border border-indigo-500 rounded-md"
                    value={sort}
                    onChange={onChangeSort}
                >
                    <option value="DESC">DESC</option>
                    <option value="ASC">ASC</option>
                </select>
            </div>
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