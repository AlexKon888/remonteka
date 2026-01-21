import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import PresetStagesManager from '@/components/preset/PresetStagesManager';
import PresetBudgetManager from '@/components/preset/PresetBudgetManager';

export default async function EditPresetPage({
  params,
}: {
  params: { id: string };
}) {
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
    },
  });

  if (!preset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Редактирование пресета
            </h1>
            <p className="text-gray-600">{preset.name}</p>
          </div>
          <Link href="/dashboard/manager/presets">
            <Button variant="outline">Назад к списку</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Основная информация</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название
                </label>
                <p className="text-gray-900">{preset.name}</p>
              </div>
              {preset.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                  </label>
                  <p className="text-gray-600">{preset.description}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {preset.style && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Стиль
                    </label>
                    <p className="text-gray-900">{preset.style}</p>
                  </div>
                )}
                {preset.budgetCategory && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Категория
                    </label>
                    <p className="text-gray-900">{preset.budgetCategory}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Стоимость
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {preset.basePrice.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
                {preset.duration && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Длительность
                    </label>
                    <p className="text-gray-900">{preset.duration} дней</p>
                  </div>
                )}
              </div>
              <div className="pt-4 border-t">
                <span className={`inline-block px-3 py-1 rounded text-sm ${
                  preset.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                  preset.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  Статус: {preset.status}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Статистика</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Этапов</p>
                <p className="text-2xl font-bold text-gray-900">{preset.stages.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Разделов сметы</p>
                <p className="text-2xl font-bold text-gray-900">{preset.budgetSections.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Типов подразделов</p>
                <p className="text-2xl font-bold text-gray-900">{preset.subsectionTypes.length}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <PresetBudgetManager preset={preset} />
          <PresetStagesManager preset={preset} />
        </div>
      </div>
    </main>
  );
}
