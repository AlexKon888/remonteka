'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

export default function NewPresetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    apartmentType: '',
    style: '',
    budgetCategory: '',
    totalArea: '',
    basePrice: '',
    duration: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/presets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || undefined,
          apartmentType: formData.apartmentType || undefined,
          style: formData.style || undefined,
          budgetCategory: formData.budgetCategory || undefined,
          totalArea: formData.totalArea ? parseFloat(formData.totalArea) : undefined,
          basePrice: parseFloat(formData.basePrice) || 0,
          duration: formData.duration ? parseInt(formData.duration) : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Ошибка создания пресета');
      }

      const preset = await response.json();
      router.push(`/dashboard/manager/presets/${preset.id}`);
    } catch (err: any) {
      setError(err.message || 'Ошибка создания пресета');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Создать новый пресет</h1>
            <p className="text-gray-600">Заполните основную информацию о готовом решении</p>
          </div>
          <Link href="/dashboard/manager/presets">
            <Button variant="outline">Назад</Button>
          </Link>
        </div>

        <Card className="p-6 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название пресета *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Например: Скандинавский стиль - 2 комнаты"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Краткое описание пресета..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип квартиры
                </label>
                <select
                  value={formData.apartmentType}
                  onChange={(e) => setFormData({ ...formData, apartmentType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите...</option>
                  <option value="Студия">Студия</option>
                  <option value="1-комнатная">1-комнатная</option>
                  <option value="2-комнатная">2-комнатная</option>
                  <option value="3-комнатная">3-комнатная</option>
                  <option value="4-комнатная">4-комнатная</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Стиль
                </label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите...</option>
                  <option value="Скандинавский">Скандинавский</option>
                  <option value="Лофт">Лофт</option>
                  <option value="Минимализм">Минимализм</option>
                  <option value="Неоклассика">Неоклассика</option>
                  <option value="Современный">Современный</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Бюджетная категория
                </label>
                <select
                  value={formData.budgetCategory}
                  onChange={(e) => setFormData({ ...formData, budgetCategory: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Выберите...</option>
                  <option value="Эконом">Эконом</option>
                  <option value="Стандарт">Стандарт</option>
                  <option value="Премиум">Премиум</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Площадь (м²)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.totalArea}
                  onChange={(e) => setFormData({ ...formData, totalArea: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Например: 65"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Базовая стоимость (₽) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Например: 1500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Длительность (дней)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Например: 45"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Создание...' : 'Создать пресет'}
              </Button>
              <Link href="/dashboard/manager/presets">
                <Button type="button" variant="outline">
                  Отмена
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
