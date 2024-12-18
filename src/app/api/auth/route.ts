import prisma from '@/shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

type Body = {
  id: string;
  name: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const body: Body = await req.json();

  if (!body) return NextResponse.json({ message: 'Invalid request' }, { status: 400 });

  const userInDb = await prisma.user.findUnique({
    where: {
      name: body.name,
    },
  });

  if (!userInDb) {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
      },
    });
    return NextResponse.json({ message: 'User created', user }, { status: 201 });
  }

  return NextResponse.json({ message: 'User get', user: userInDb }, { status: 200 });
}
