export interface RepositorySlice<T> {
    data: T[] | null;
    loading: boolean;
    error: string | null;
    fetch: () => Promise<void>;
    retry: () => Promise<void>;
}
