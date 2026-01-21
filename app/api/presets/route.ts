import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Схема валидации для создания пресета
const createPresetSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  apartmentType: z.string().optional(),
  style: z.string().optional(),
  budgetCategory: z.string().optional(),
  totalArea: z.number().optional(),
  basePrice: z.number().min(0),
  duration: z.number().optional(),
});

// GET - получить список пресетов
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const presets = await prisma.preset.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            projects: true,
            stages: true,
            budgetSections: true,
          },
        },
      },
    });

    return NextResponse.json(presets);
  } catch (error) {
    console.error('Ошибка получения пресетов:', error);
    return NextResponse.json(
      { error: 'Ошибка получения пресетов' },
      { status: 500 }
    );
  }
}

// POST - создать новый пресет
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createPresetSchema.parse(body);

    // Временно используем первого пользователя как создателя
    // Позже добавим аутентификацию
    const firstUser = await prisma.user.findFirst({
      where: {
        role: {
          in: ['MANAGER', 'MODERATOR'],
        },
      },
    });
    if (!firstUser) {
      return NextResponse.json(
        { error: 'Нет менеджеров в системе. Создайте пользователя на странице /setup' },
        { status: 400 }
      );
    }

    // Создаем пресет
    const preset = await prisma.preset.create({
      data: {
        ...data,
        createdById: firstUser.id,
        status: 'DRAFT',
      },
    });

    // Создаем базовые типы подразделов (Работа, Материал, Доставка, Спецификация)
    const defaultSubsectionTypes = [
      { code: 'work', name: 'Работа', order: 1, isDefault: true },
      { code: 'materials', name: 'Материал', order: 2, isDefault: true },
      { code: 'delivery', name: 'Доставка', order: 3, isDefault: true },
      { code: 'specification', name: 'Спецификация', order: 4, isDefault: true },
    ];

    await prisma.presetSubsectionType.createMany({
      data: defaultSubsectionTypes.map(type => ({
        ...type,
        presetId: preset.id,
      })),
    });

    return NextResponse.json(preset, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Ошибка создания пресета:', error);
    return NextResponse.json(
      { error: 'Ошибка создания пресета' },
      { status: 500 }
    );
  }
}
