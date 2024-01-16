import Image from "next/image";
import React from "react";

const EmptyState = () => {
    return (
        <div className='px-4 py-10 sm:px-6 lg:px-8 h-full justify-center items-center bg-gray-100'>
            <div className='text-center flex flex-col justify-center items-center  h-full'>
                <div className='relative h-2/3 w-full'>
                    <Image src={"/newChat.svg"} alt='Add New Chat' fill />
                </div>
                <h3 className='mt-2 text-2xl font-semibold text-primary-600'>
                    Select a Chat or Start a new Conversation
                </h3>
            </div>
        </div>
    );
};

export default EmptyState;
