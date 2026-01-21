import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default async function DashboardPage() {
  // Пока что просто показываем базовую страницу
  // Позже добавим авторизацию и фильтрацию по пользователю
  
  const projects = await prisma.project.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      preset: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
          <Link href="/">
            <Button variant="outline">На главную</Button>
          </Link>
        </div>

        <div className="mb-6">
          <Link href="/catalog">
            <Button>Выбрать готовое решение</Button>
          </Link>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Мои проекты</h2>
          
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">У вас пока нет проектов</p>
              <Link href="/catalog">
                <Button>Выбрать готовое решение</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600">{project.address}</p>
                      <p className="text-sm text-gray-500">
                        Пресет: {project.preset.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        project.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                        project.status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/projects/${project.id}`}>
                    <Button variant="outline" className="mt-4 w-full">
                      Открыть проект
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
