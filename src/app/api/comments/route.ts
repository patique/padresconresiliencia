import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
        return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { blogPostId: postId },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching comments' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { author, text, blogPostId } = body;

        if (!text || !blogPostId) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const comment = await prisma.comment.create({
            data: {
                author: author || 'Anónimo',
                text,
                blogPostId,
            },
        });

        return NextResponse.json(comment);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating comment' }, { status: 500 });
    }
}
