import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('id');

  if (userId) {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      take: 10,
    });

    if (!posts) return NextResponse.json({ message: 'User posts not found' }, { status: 404 });
    return NextResponse.json({ posts });
  }

  const allPosts = await prisma.post.findMany();

  if (!allPosts) return NextResponse.json({ message: 'No posts found' }, { status: 404 });

  return NextResponse.json({ posts: allPosts });
}
