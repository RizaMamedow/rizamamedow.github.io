import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";


export const useMedia = (
    queries: string[],
    values: number[],
    defaultValue: number,
): number => {
    // Stable function to get the current value based on matching media query
    const get = useCallback(() => {
        // Проверка на клиентскую среду
        if (typeof window === 'undefined') {
            return defaultValue;
        }
        return values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
    }, [queries, values, defaultValue]);

    const [value, setValue] = useState(defaultValue); // Инициализируем defaultValue

    useEffect(() => {
        // Устанавливаем правильное значение после монтирования на клиенте
        setValue(get());

        const handler = () => setValue(get());
        
        queries.forEach((q) =>
            matchMedia(q).addEventListener("change", handler),
        );
        
        return () =>
            queries.forEach((q) =>
                matchMedia(q).removeEventListener("change", handler),
            );
    }, [queries, get]);

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
