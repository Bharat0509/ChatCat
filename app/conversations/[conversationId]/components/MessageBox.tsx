import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import ConversationId from "../page";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}
const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const isOwn = session.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(", ");

    const container = clsx(`flex gap-3 p-4`, isOwn && "justify-end");

    const avatar = clsx(isOwn && "order-2");

    const body = clsx(`flex flex-col gap-2 p-4`, isOwn && "justify-end");

    const message = clsx(
        `text-sm w-[20rem] flex flex-wrap  whitespace-normal`,
        isOwn ? "bg-primary-600 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className='flex items-center gap-1'>
                    <div className='text-sm text-gray-500'>
                        {data.sender.name}
                    </div>
                    <div className='text-xs text-gray-500'>
                        {format(new Date(data.createdAt), "p")}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal
                        src={data.image}
                        isOpen={imageModalOpen}
                        onClose={() => setImageModalOpen(false)}
                    />
                    {data.image ? (
                        <Image
                            alt='Image'
                            height={288}
                            width={288}
                            src={data.image}
                            onClick={() => setImageModalOpen(true)}
                            className='object-cover
                cursor-pointer hover:scale-110 transition translate'
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {/* <div className='text-xs font-light text-gray-500'> */}
                {isLast && isOwn && seenList.length > 0 && (
                    <div className='text-xs font-light text-gray-500'>{`Seen by ${seenList}`}</div>
                )}
                {/* </div> */}
            </div>
        </div>
    );
};

export default MessageBox;
