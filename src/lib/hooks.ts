import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";


export const useMedia = (
    queries: string[],
    values: number[],
    defaultValue: number
): number => {
    // Stable function to get the current value based on matching media query
    const get = useCallback(() => {
        return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
    }, [queries, values, defaultValue]);

    const [value, setValue] = useState(get);

    useEffect(() => {
        const handler = () => setValue(get);

        // Add event listeners
        queries.forEach((q) => {
            matchMedia(q).addEventListener("change", handler);
        });

        // Cleanup
        return () => {
            queries.forEach((q) => {
                matchMedia(q).removeEventListener("change", handler);
            });
        };
    }, [get, queries]);

    return value;
};


export const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;

        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });

        ro.observe(ref.current);

        return () => ro.disconnect();
    }, []);

    return [ref, size] as const;
};
