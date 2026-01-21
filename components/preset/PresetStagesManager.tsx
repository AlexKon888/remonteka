'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

interface PresetStagesManagerProps {
  preset: any; // TODO: типизировать
}

export default function PresetStagesManager({ preset }: PresetStagesManagerProps) {
  const router = useRouter();
  const [stages, setStages] = useState(preset.stages || []);
  const [showAddStage, setShowAddStage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStage, setNewStage] = useState({
    name: '',
    plannedDurationDays: '',
    paymentPercent: '',
    description: '',
  });

  const handleAddStage = async () => {
    if (!newStage.name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/presets/${preset.id}/stages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newStage.name,
          plannedDurationDays: newStage.plannedDurationDays ? parseInt(newStage.plannedDurationDays) : undefined,
          paymentPercent: newStage.paymentPercent ? parseFloat(newStage.paymentPercent) : undefined,
          description: newStage.description || undefined,
          order: stages.length,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка создания этапа');
      }

      router.refresh();
      setNewStage({ name: '', plannedDurationDays: '', paymentPercent: '', description: '' });
      setShowAddStage(false);
    } catch (error) {
      alert('Ошибка создания этапа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Этапы работ</h2>
        <Button onClick={() => setShowAddStage(true)}>
          + Добавить этап
        </Button>
      </div>

      {showAddStage && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3 text-gray-900">Новый этап</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newStage.name}
              onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
              placeholder="Название этапа (например: Демонтаж)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={newStage.plannedDurationDays}
                onChange={(e) => setNewStage({ ...newStage, plannedDurationDays: e.target.value })}
                placeholder="Длительность (дней)"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                value={newStage.paymentPercent}
                onChange={(e) => setNewStage({ ...newStage, paymentPercent: e.target.value })}
                placeholder="% оплаты"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <textarea
              value={newStage.description}
              onChange={(e) => setNewStage({ ...newStage, description: e.target.value })}
              placeholder="Описание этапа (необязательно)"
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddStage} disabled={loading || !newStage.name.trim()}>
                {loading ? 'Создание...' : 'Создать этап'}
              </Button>
              <Button onClick={() => {
                setShowAddStage(false);
                setNewStage({ name: '', plannedDurationDays: '', paymentPercent: '', description: '' });
              }} variant="outline">
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {stages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Этапов пока нет</p>
          <Button onClick={() => setShowAddStage(true)}>Создать первый этап</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {stages.map((stage: any, index: number) => (
            <div key={stage.id} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Этап {index + 1}
                    </span>
                    <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                  </div>
                  {stage.description && (
                    <p className="text-sm text-gray-600 mb-2">{stage.description}</p>
                  )}
                  <div className="flex gap-4 text-sm text-gray-600">
                    {stage.plannedDurationDays && (
                      <span>Длительность: {stage.plannedDurationDays} дней</span>
                    )}
                    {stage.paymentPercent > 0 && (
                      <span>Оплата: {stage.paymentPercent}%</span>
                    )}
                    {stage.checkpoints && stage.checkpoints.length > 0 && (
                      <span>Чек-пойнтов: {stage.checkpoints.length}</span>
                    )}
                  </div>
                  {stage.dependencies && stage.dependencies.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500">
                      Зависит от: {stage.dependencies.map((d: any) => d.dependsOn.name).join(', ')}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <Button variant="outline" className="text-sm">
                    Редактировать
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
