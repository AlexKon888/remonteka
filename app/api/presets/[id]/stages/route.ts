import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createStageSchema = z.object({
  name: z.string().min(1),
  order: z.number().optional(),
  plannedDurationDays: z.number().optional(),
  paymentPercent: z.number().min(0).max(100).optional(),
  description: z.string().optional(),
  dependencyIds: z.array(z.string()).optional(),
  relatedSubsectionTypeIds: z.array(z.string()).optional(),
});

// POST - создать этап
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = createStageSchema.parse(body);

    // Проверяем что пресет существует
    const preset = await prisma.preset.findUnique({
      where: { id: params.id },
    });

    if (!preset) {
      return NextResponse.json(
        { error: 'Пресет не найден' },
        { status: 404 }
      );
    }

    // Создаем этап
    const stage = await prisma.presetStage.create({
      data: {
        presetId: params.id,
        name: data.name,
        order: data.order || 0,
        plannedDurationDays: data.plannedDurationDays,
        paymentPercent: data.paymentPercent || 0,
        description: data.description,
      },
    });

    // Создаем зависимости если указаны
    if (data.dependencyIds && data.dependencyIds.length > 0) {
      await Promise.all(
        data.dependencyIds.map((dependsOnId) =>
          prisma.presetStageDependency.create({
            data: {
              stageId: stage.id,
              dependsOnId,
            },
          })
        )
      );
    }

    // Создаем связи с типами подразделов если указаны
    if (data.relatedSubsectionTypeIds && data.relatedSubsectionTypeIds.length > 0) {
      await Promise.all(
        data.relatedSubsectionTypeIds.map((subsectionTypeId) =>
          prisma.presetStageSubsectionType.create({
            data: {
              stageId: stage.id,
              subsectionTypeId,
            },
          })
        )
      );
    }

    return NextResponse.json(stage, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Неверные данные', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Ошибка создания этапа:', error);
    return NextResponse.json(
      { error: 'Ошибка создания этапа' },
      { status: 500 }
    );
  }
}
