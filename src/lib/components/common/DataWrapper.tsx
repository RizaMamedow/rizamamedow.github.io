import ErrorView from "@/src/lib/components/common/ErrorView";
import LoadingText from "@/src/lib/components/common/LoadingText";
import { useEffect } from "react";

interface DataWrapperProps<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetch: () => void;
    children?: (data: T) => React.ReactNode;
    loadingComponent?: React.ReactNode;
    errorComponent?: (error: string) => React.ReactNode;
}

export function DataWrapper<T>({
    data,
    loading,
    error,
    fetch,
    children,
    loadingComponent,
    errorComponent,
}: DataWrapperProps<T>) {
    useEffect(() => {
        if (!data && !loading && !error) {
            fetch();
        }
    }, [data, loading, error, fetch]);

    if (loading) {
        return (
            loadingComponent ?? (
                <div className="mt-30 flex justify-center items-center">
                    <LoadingText />
                </div>
            )
        );
    }

    if (error) {
        return errorComponent?.(error) ?? (
            <ErrorView error={error} onClick={fetch} />
        )
    }

    if (!data || !children) {
        return null;
    }

    return <>{children(data)}</>;
}
