import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default async function PresetsPage() {
  let presets = [];
  
  try {
    presets = await prisma.preset.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Ошибка загрузки пресетов:', error);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Управление пресетами</h1>
            <p className="text-gray-600">Создание и редактирование готовых решений</p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard/manager/presets/new">
              <Button>+ Создать пресет</Button>
            </Link>
            <Link href="/dashboard/manager">
              <Button variant="outline">Назад</Button>
            </Link>
          </div>
        </div>

        {presets.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600 mb-4">Пресетов пока нет</p>
            <Link href="/dashboard/manager/presets/new">
              <Button>Создать первый пресет</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <Card key={preset.id} hover className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {preset.name}
                    </h3>
                    {preset.description && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        {preset.description}
                      </p>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {preset.style && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {preset.style}
                        </span>
                      )}
                      {preset.budgetCategory && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {preset.budgetCategory}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded ${
                        preset.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                        preset.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {preset.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>Проектов: {preset._count.projects}</span>
                    {preset.basePrice > 0 && (
                      <span className="font-semibold">
                        {preset.basePrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/manager/presets/${preset.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Редактировать
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
