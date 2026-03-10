import "dotenv/config";
import axios, { AxiosInstance } from "axios";

// TODO: Скрыть переменные
export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
    },
});
