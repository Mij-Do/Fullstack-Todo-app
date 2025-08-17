import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axios.instance";
import type { AxiosRequestConfig } from "axios";

interface IQuery {
    queryKey: string[];
    url: string;
    config?: AxiosRequestConfig;
}


export const customQueryHook = ({queryKey, url, config}: IQuery) => useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const {data} = await axiosInstance.get(url, config)
            return data;
        }
    });