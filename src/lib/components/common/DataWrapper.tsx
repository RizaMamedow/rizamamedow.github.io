import ErrorView from "@/src/lib/components/common/ErrorView";
import LoadingText from "@/src/lib/components/common/LoadingText";

interface DataWrapperProps<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    onRetry: () => void;
    children: (data: T) => React.ReactNode;
    loadingComponent?: React.ReactNode;
}

export function DataWrapper<T>({
    data,
    loading,
    error,
    onRetry,
    children,
    loadingComponent
}: DataWrapperProps<T>) {
    if (loading) {
        return loadingComponent ?? (
            <div className="mt-30 flex justify-center items-center">
                <LoadingText />
            </div>
        );
    }

    if (error) {
        return <ErrorView error={error} onClick={onRetry} />;
    }

    if (!data) {
        return null;
    }

    return <>{children(data)}</>;
}