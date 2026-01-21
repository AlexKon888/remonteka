import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default async function ManagerDashboardPage() {
  let presets = [];
  let projects = [];
  
  try {
    presets = await prisma.preset.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    });

    projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      include: {
        preset: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Ошибка загрузки данных:', error);
    // Продолжаем работу даже если есть ошибка
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель менеджера</h1>
            <p className="text-gray-600">Управление пресетами и проектами</p>
          </div>
          <Link href="/">
            <Button variant="outline">На главную</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Пресеты</h2>
              <Link href="/dashboard/manager/presets/new">
                <Button>+ Создать пресет</Button>
              </Link>
            </div>
            <p className="text-gray-600 mb-4">
              Всего пресетов: <span className="font-semibold">{presets.length}</span>
            </p>
            {presets.length > 0 ? (
              <div className="space-y-2">
                {presets.slice(0, 5).map((preset) => (
                  <div key={preset.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-900">{preset.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      preset.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                      preset.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {preset.status}
                    </span>
                  </div>
                ))}
                {presets.length > 5 && (
                  <Link href="/dashboard/manager/presets">
                    <Button variant="outline" className="w-full mt-2">
                      Показать все ({presets.length})
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Пресетов пока нет</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Проекты</h2>
            <p className="text-gray-600 mb-4">
              Всего проектов: <span className="font-semibold">{projects.length}</span>
            </p>
            {projects.length > 0 ? (
              <div className="space-y-2">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <span className="text-sm text-gray-900">{project.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{project.preset.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))}
                {projects.length > 5 && (
                  <Link href="/dashboard/projects">
                    <Button variant="outline" className="w-full mt-2">
                      Показать все ({projects.length})
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Проектов пока нет</p>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Быстрые действия</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/manager/presets/new">
              <Button className="w-full">Создать новый пресет</Button>
            </Link>
            <Link href="/dashboard/manager/presets">
              <Button variant="outline" className="w-full">Управление пресетами</Button>
            </Link>
            <Link href="/dashboard/projects">
              <Button variant="outline" className="w-full">Все проекты</Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
