import React, {
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { gsap } from "gsap";
import { Skill } from "@/types/skill";
import { useMeasure, useMedia } from "@/hooks";


interface GridItem extends Skill {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface MasonryProps {
    items: Skill[];
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random";
    scaleOnHover?: boolean;
    hoverScale?: number;
}


const SkillsMasonry: React.FC<MasonryProps> = ({
    items,
    ease = "power3.out",
    duration = 0.6,
    stagger = 0.05,
    animateFrom = "bottom",
    scaleOnHover = true,
    hoverScale = 0.95,
}) => {
    const columns = useMedia(
        ["(min-width:1400px)", "(min-width:1000px)", "(min-width:600px)"],
        [4, 3, 2],
        1,
    );

    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const hasMounted = useRef(false);

    const getInitialPosition = (item: GridItem) => {
        switch (animateFrom) {
            case "top":
                return { x: item.x, y: item.y - 80 };
            case "left":
                return { x: item.x - 80, y: item.y };
            case "right":
                return { x: item.x + 80, y: item.y };
            case "center":
                return { x: width / 2, y: item.y };
            default:
                return { x: item.x, y: item.y + 80 };
        }
    };

    const grid = useMemo<GridItem[]>(() => {
        if (!width) return [];

        const gap = 16;
        const colHeights = new Array(columns).fill(0);
        const columnWidth = (width - (columns - 1) * gap) / columns;

        return items.map((skill) => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const height = 72;

            const x = col * (columnWidth + gap);
            const y = colHeights[col];

            colHeights[col] += height + gap;

            return { ...skill, x, y, w: columnWidth, h: height };
        });
    }, [items, columns, width]);

    useLayoutEffect(() => {
        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            const target = {
                x: item.x,
                y: item.y,
                width: item.w,
                height: item.h,
            };

            if (!hasMounted.current) {
                const start = getInitialPosition(item);

                gsap.fromTo(
                    selector,
                    {
                        opacity: 0,
                        ...start,
                    },
                    {
                        opacity: 1,
                        ...target,
                        duration,
                        ease,
                        delay: index * stagger,
                    },
                );
            } else {
                gsap.to(selector, {
                    ...target,
                    duration,
                    ease,
                    overwrite: "auto",
                });
            }
        });

        hasMounted.current = true;
    }, [grid]);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {grid.map((skill) => (
                <div
                    key={skill.id}
                    data-key={skill.id}
                    className="absolute"
                    style={{ willChange: "transform, width, height, opacity" }}
                    onMouseEnter={() =>
                        scaleOnHover &&
                        gsap.to(`[data-key="${skill.id}"]`, {
                            scale: hoverScale,
                            duration: 0.2,
                        })
                    }
                    onMouseLeave={() =>
                        scaleOnHover &&
                        gsap.to(`[data-key="${skill.id}"]`, {
                            scale: 1,
                            duration: 0.2,
                        })
                    }
                >
                    <div className="w-full h-full border bg-neutral-900 text-white flex items-center justify-between px-4">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs opacity-60">
                            {skill.category}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillsMasonry;
