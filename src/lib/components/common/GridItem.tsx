import { motion, Transition } from "framer-motion";

interface GridItemProps {
    children: React.ReactNode;
    index?: number;
    className?: string;
    transition?: Transition;
}

export function GridItem({
    children,
    index = 0,
    className = "",
    transition = {
        duration: 0.15,
        delay: index * 0.01,
        ease: "easeOut",
    },
}: GridItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }} // once: true - анимация только 1 раз, amount: насколько элемент должен быть виден (0.3 = 30%)
            transition={transition}
            className={className}
        >
            {children}
        </motion.div>
    );
}
