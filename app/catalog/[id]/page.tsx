import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

export default async function PresetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const preset = await prisma.preset.findUnique({
    where: { id: params.id },
    include: {
      budgetSections: {
        include: {
          subsections: {
            include: {
              subsectionType: true,
              items: true,
            },
          },
        },
      },
      stages: {
        include: {
          checkpoints: true,
        },
        orderBy: {
          order: 'asc',
        },
      },
      files: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  if (!preset) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/catalog" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Назад к каталогу
        </Link>

        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{preset.name}</h1>
          
          <div className="flex gap-4 mb-6">
            {preset.style && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                {preset.style}
              </span>
            )}
            {preset.budgetCategory && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
                {preset.budgetCategory}
              </span>
            )}
            {preset.totalArea && (
              <span className="text-gray-600">{preset.totalArea} м²</span>
            )}
            {preset.duration && (
              <span className="text-gray-600">{preset.duration} дней</span>
            )}
          </div>

          {preset.description && (
            <p className="text-gray-600 mb-6">{preset.description}</p>
          )}

          <div className="text-3xl font-bold text-gray-900 mb-6">
            от {preset.basePrice.toLocaleString('ru-RU')} ₽
          </div>

          <Button href={`/dashboard/projects/new?presetId=${preset.id}`}>
            Выбрать этот ремонт
          </Button>
        </div>

        {preset.stages.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Этапы работ</h2>
            <div className="space-y-4">
              {preset.stages.map((stage) => (
                <div key={stage.id} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                  {stage.plannedDurationDays && (
                    <p className="text-sm text-gray-600">
                      Плановая длительность: {stage.plannedDurationDays} дней
                    </p>
                  )}
                  {stage.checkpoints.length > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      Чек-пойнтов: {stage.checkpoints.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {preset.budgetSections.length > 0 && (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Смета</h2>
            <div className="space-y-4">
              {preset.budgetSections.map((section) => (
                <div key={section.id} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{section.name}</h3>
                  <div className="text-gray-600">
                    {section.subsections.map((subsection) => (
                      <div key={subsection.id} className="flex justify-between mb-1">
                        <span>{subsection.subsectionType.name}:</span>
                        <span className="font-medium">
                          {subsection.totalAmount.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
