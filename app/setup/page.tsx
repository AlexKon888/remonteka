'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          password: formData.password,
          role: 'MANAGER',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Ошибка создания пользователя');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/manager');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Ошибка создания пользователя');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Пользователь создан!
          </h1>
          <p className="text-gray-600 mb-4">
            Перенаправление в панель менеджера...
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Создание первого пользователя
        </h1>
        <p className="text-gray-600 mb-6">
          Создайте администратора для управления платформой
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Иван Иванов"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Минимум 6 символов"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Подтвердите пароль *
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Повторите пароль"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Создание...' : 'Создать администратора'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-blue-600 hover:underline">
            Вернуться на главную
          </a>
        </div>
      </Card>
    </main>
  );
}
