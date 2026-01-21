import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
  role: z.enum(['CUSTOMER', 'MANAGER', 'BUILDER', 'DESIGNER', 'ENGINEER', 'MODERATOR', 'SUPPLIER', 'COMPLETIONIST']).optional(),
});

// POST - создать пользователя (для первого админа)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createUserSchema.parse(body);

    // Проверяем что пользователя с таким email нет
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Хешируем пароль
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash,
        role: data.role || 'MANAGER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Ошибка создания пользователя:', error);
    return NextResponse.json(
      { error: 'Ошибка создания пользователя' },
      { status: 500 }
    );
  }
}

// GET - получить список пользователей
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Ошибка получения пользователей:', error);
    return NextResponse.json(
      { error: 'Ошибка получения пользователей' },
      { status: 500 }
    );
  }
}
