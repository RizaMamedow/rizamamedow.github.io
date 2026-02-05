import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";

export const useMedia = (
    queries: string[],
    values: number[],
    defaultValue: number,
): number => {
    const getSnapshot = () => {
        if (typeof window === "undefined") {
            return defaultValue;
        }

        const index = queries.findIndex((q) => window.matchMedia(q).matches);

        return values[index] ?? defaultValue;
    };

    const subscribe = (callback: () => void) => {
        const mqls = queries.map((q) => window.matchMedia(q));

        mqls.forEach((mql) => mql.addEventListener("change", callback));

        return () =>
            mqls.forEach((mql) => mql.removeEventListener("change", callback));
    };

    return useSyncExternalStore(subscribe, getSnapshot, () => defaultValue);
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
