import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

type Body = {
  title: string;
  content: string;
  authorId: string;
};

export async function POST(req: NextRequest) {
  const body: Body = await req.json();
  if (!body) return NextResponse.json({ message: 'Invalid request' }, { status: 400 });

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
    },
  });

  if (!newPost) return NextResponse.json({ message: 'Post not created' }, { status: 400 });

  return NextResponse.json(newPost, { status: 201 });
}
