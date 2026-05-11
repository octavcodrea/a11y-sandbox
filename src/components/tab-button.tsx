import React from "react";
import { cls } from "../lib/utils";

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    icon?: React.ReactNode;
}

const TabButton = ({
    active = false,
    icon,
    className,
    children,
    ...props
}: TabButtonProps) => {
    return (
        <button
            className={cls(
                "flex items-center gap-2 rounded-md p-2 text-xs sm:text-base",
                active
                    ? "bg-blue-100 font-semibold text-blue-600"
                    : "bg-gray-100 text-gray-700",
                className,
            )}
            {...props}
        >
            {icon}
            {children}
        </button>
    );
};

export default TabButton;
