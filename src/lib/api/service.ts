import { apiClient } from "@/src/lib/api/client";
import { ApiResponse } from "@/src/lib/types/api";

export default class ApiServiceBase<T> {
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async getAll(params?: unknown): Promise<T[]> {
        const res = await apiClient.get<ApiResponse<T[]>>(this.endpoint, {
            params,
        });
        return res.data.data;
    }

    async getById(id: string): Promise<T> {
        const { data } = await apiClient.get(`${this.endpoint}/${id}`);
        return data;
    }

    async create(payload: Partial<T>): Promise<T> {
        const { data } = await apiClient.post(this.endpoint, payload);
        return data;
    }

    async update(id: string, payload: Partial<T>): Promise<T> {
        const { data } = await apiClient.put(`${this.endpoint}/${id}`, payload);
        return data;
    }

    async delete(id: string): Promise<void> {
        await apiClient.delete(`${this.endpoint}/${id}`);
    }
}
