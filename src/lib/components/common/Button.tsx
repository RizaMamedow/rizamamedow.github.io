import clsx from "clsx"
import { MouseEventHandler } from "react"

export type ButtonProps = {
    className?: string
    containerClassName?: string
    disabled?: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
    children?: React.ReactNode | null
    removeDefaultClassName?: boolean
    removeHoverDefaultClassName?: boolean
}

export function Button({
    className = "",
    containerClassName = "",
    disabled = false,
    onClick,
    children = null,
    removeDefaultClassName = false,
    removeHoverDefaultClassName = false
}: ButtonProps) {
    return (
        <div
            className={clsx(
                containerClassName
            )}
        >
            <button
                onClick={onClick}
                disabled={disabled}
                className={clsx(
                    !removeDefaultClassName && [
                        "border px-3 py-2 text-center font-bold",
                        !removeHoverDefaultClassName && "hover:bg-secondary/30 hover:border-secondary",
                        "active:scale-90",
                        disabled && "opacity-50 pointer-events-none"
                    ],
                    className
                )}
            >
                {children}
            </button>
        </div>
    )
}

export default Button
