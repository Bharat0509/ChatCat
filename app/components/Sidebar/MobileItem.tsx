"use client";

import clsx from "clsx";
import Link from "next/link";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}
const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick,
}) => {
    const handleClick = () => {
        if (onClick) return onClick();
    };
    return (
        <Link
            href={href}
            onClick={onClick}
            title={href.replace("/", "")}
            className={clsx(
                `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 border-t border-primary-200 hover:text-black hover:bg-primary-200`,
                active && `bg-primary-300 text-black`
            )}
        >
            <Icon className='h-6 w-6 shrink-0 text-primary-900' />
        </Link>
    );
};

export default MobileItem;
