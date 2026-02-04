import { useMedia } from "../../hooks";

interface GridProps {
    children?: React.ReactNode | null;
    cols?: {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        '2xl'?: number;
    };
    gap?: number;
    className?: string;
}

function Grid({ 
    children = null, 
    cols = { default: 1, sm: 2, md: 3, lg: 4 },
    gap = 4,
    className = ''
}: GridProps) {
    // Определяем медиа-запросы (от большего к меньшему)
    const queries = [
        '(min-width: 1536px)', // 2xl
        '(min-width: 1280px)', // xl
        '(min-width: 1024px)', // lg
        '(min-width: 768px)',  // md
        '(min-width: 640px)',  // sm
    ];

    const values = [
        cols['2xl'] || cols.xl || cols.lg || cols.md || cols.sm || cols.default || 1,
        cols.xl || cols.lg || cols.md || cols.sm || cols.default || 1,
        cols.lg || cols.md || cols.sm || cols.default || 1,
        cols.md || cols.sm || cols.default || 1,
        cols.sm || cols.default || 1,
    ];

    const currentCols = useMedia(queries, values, cols.default || 1);

    // Маппинг для gap
    const getGapClass = (gap: number) => {
        const gapMap: Record<number, string> = {
            0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3',
            4: 'gap-4', 5: 'gap-5', 6: 'gap-6', 8: 'gap-8',
            10: 'gap-10', 12: 'gap-12', 16: 'gap-16'
        };
        return gapMap[gap] || 'gap-4';
    };

    // Маппинг для cols
    const getColsClass = (cols: number) => {
        const colsMap: Record<number, string> = {
            1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3',
            4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6',
            12: 'grid-cols-12'
        };
        return colsMap[cols] || 'grid-cols-1';
    };

    return (
        <div className={`grid ${getColsClass(currentCols)} ${getGapClass(gap)} ${className}`}>
            {children}
        </div>
    );
}

export default Grid;