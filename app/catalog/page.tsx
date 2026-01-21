import { prisma } from '@/lib/prisma';
import PresetCard from '@/components/preset/PresetCard';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default async function CatalogPage() {
  // Пока что просто получаем все опубликованные пресеты
  // Позже добавим фильтры
  const presets = await prisma.preset.findMany({
    where: {
      status: 'PUBLISHED',
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Каталог готовых решений
            </h1>
            <p className="text-gray-600">
              Выберите готовый проект ремонта или создайте свой
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">На главную</Button>
          </Link>
        </div>

        {presets.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">Пока нет доступных пресетов</p>
            <p className="text-sm text-gray-500">
              Создайте первый пресет в панели менеджера
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <PresetCard key={preset.id} preset={preset} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
