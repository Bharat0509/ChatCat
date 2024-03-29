"use client";
import React from "react";
import clsx from "clsx";

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    danger?: boolean;
    secondary?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    danger,
    secondary,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(
                `
            flex
            justify-center
            rounded-md
            px-3
            py-2
            test-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `,
                disabled && "opacity-50 cursor-default",
                fullWidth && "w-full",
                secondary ? "text-gray-900" : "text-white",
                danger &&
                    "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",

                !secondary &&
                    !danger &&
                    "bg-primary-800 hover:bg-primary-900 focus-visible:outline-primary-400"
            )}
        >
            {children}
        </button>
    );
};
