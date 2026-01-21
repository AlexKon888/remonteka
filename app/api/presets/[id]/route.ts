import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - получить пресет по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const preset = await prisma.preset.findUnique({
      where: { id: params.id },
      include: {
        subsectionTypes: {
          orderBy: { order: 'asc' },
        },
        budgetSections: {
          include: {
            subsections: {
              include: {
                subsectionType: true,
                items: {
                  orderBy: { order: 'asc' },
                },
              },
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { order: 'asc' },
        },
        stages: {
          include: {
            checkpoints: {
              orderBy: { order: 'asc' },
            },
            relatedSubsectionTypes: {
              include: {
                subsectionType: true,
              },
            },
            dependencies: {
              include: {
                dependsOn: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        files: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!preset) {
      return NextResponse.json(
        { error: 'Пресет не найден' },
        { status: 404 }
      );
    }

    return NextResponse.json(preset);
  } catch (error) {
    console.error('Ошибка получения пресета:', error);
    return NextResponse.json(
      { error: 'Ошибка получения пресета' },
      { status: 500 }
    );
  }
}

// PATCH - обновить пресет
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const preset = await prisma.preset.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        apartmentType: body.apartmentType,
        style: body.style,
        budgetCategory: body.budgetCategory,
        totalArea: body.totalArea,
        basePrice: body.basePrice,
        duration: body.duration,
        status: body.status,
      },
    });

    return NextResponse.json(preset);
  } catch (error) {
    console.error('Ошибка обновления пресета:', error);
    return NextResponse.json(
      { error: 'Ошибка обновления пресета' },
      { status: 500 }
    );
  }
}

// DELETE - удалить пресет
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.preset.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления пресета:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления пресета' },
      { status: 500 }
    );
  }
}
