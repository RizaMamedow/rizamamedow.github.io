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
}
