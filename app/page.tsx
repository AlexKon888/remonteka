import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Ремонтека
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Платформа отслеживания процесса производства ремонта квартиры
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link 
            href="/catalog"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Каталог</h2>
            <p className="text-gray-600">Просмотр готовых решений ремонта</p>
          </Link>
          
          <Link 
            href="/dashboard"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Личный кабинет</h2>
            <p className="text-gray-600">Мои проекты и отслеживание прогресса</p>
          </Link>
          
          <Link 
            href="/dashboard/manager"
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Панель менеджера</h2>
            <p className="text-gray-600">Управление пресетами и проектами</p>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Начало работы</h2>
          <p className="text-gray-600 mb-4">
            Для начала работы создайте первого администратора:
          </p>
          <div className="mb-4">
            <Link href="/setup">
              <Button>Создать администратора</Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            После создания администратора вы сможете создавать пресеты через панель менеджера
          </p>
        </div>
      </div>
    </main>
  );
}
