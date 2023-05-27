import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        const CurrentUser = await getCurrentUser();
        const body = await request.json();

        const { userId, isGroup, members, name } = body;
        if (!CurrentUser?.id || !CurrentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Insufficient Data", { status: 400 });
        }
        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value,
                            })),
                            {
                                id: CurrentUser.id,
                            },
                        ],
                    },
                },
                include: {
                    users: true,
                },
            });
            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(
                        user.email,
                        "conversation:new",
                        newConversation
                    );
                }
            });
            return NextResponse.json(newConversation);
        }
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [CurrentUser.id, userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, CurrentUser.id],
                        },
                    },
                ],
            },
        });
        const singleCoversation = existingConversations[0];
        if (singleCoversation) {
            return NextResponse.json(singleCoversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [{ id: CurrentUser.id }, { id: userId }],
                },
            },
            include: {
                users: true,
            },
        });
        newConversation.users.map((user) => {
            if (user.email) {
                pusherServer.trigger(
                    user.email,
                    "conversation:new",
                    newConversation
                );
            }
        });
        return NextResponse.json(newConversation);
    } catch (error) {
        return new NextResponse("Internal Server Error ", { status: 500 });
    }
}
