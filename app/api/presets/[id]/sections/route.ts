import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createSectionSchema = z.object({
  name: z.string().min(1),
  order: z.number().optional(),
});

// POST - создать раздел сметы
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = createSectionSchema.parse(body);

    // Получаем пресет
    const preset = await prisma.preset.findUnique({
      where: { id: params.id },
      include: {
        subsectionTypes: true,
      },
    });

    if (!preset) {
      return NextResponse.json(
        { error: 'Пресет не найден' },
        { status: 404 }
      );
    }

    // Создаем раздел
    const section = await prisma.presetBudgetSection.create({
      data: {
        presetId: params.id,
        name: data.name,
        order: data.order || 0,
      },
    });

    // Автоматически создаем подразделы для всех типов подразделов пресета
    const subsections = await Promise.all(
      preset.subsectionTypes.map((type) =>
        prisma.presetBudgetSubsection.create({
          data: {
            sectionId: section.id,
            subsectionTypeId: type.id,
            order: type.order,
          },
        })
      )
    );

    return NextResponse.json({
      ...section,
      subsections,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Ошибка создания раздела:', error);
    return NextResponse.json(
      { error: 'Ошибка создания раздела' },
      { status: 500 }
    );
  }
}
