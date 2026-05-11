import React from "react";
import { cls } from "../lib/utils";

type IconButtonVariant = "default" | "active" | "danger";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: IconButtonVariant;
}

const variantClasses: Record<IconButtonVariant, string> = {
    default: "text-gray-600",
    active: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    danger: "bg-red-100 text-red-500 hover:bg-red-200",
};

const IconButton = ({
    variant = "default",
    className,
    children,
    ...props
}: IconButtonProps) => {
    return (
        <button
            className={cls(
                "flex h-12 w-12 items-center justify-center rounded-md",
                variantClasses[variant],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;
