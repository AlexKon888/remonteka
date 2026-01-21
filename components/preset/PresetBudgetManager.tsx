'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

interface PresetBudgetManagerProps {
  preset: any; // TODO: типизировать
}

export default function PresetBudgetManager({ preset }: PresetBudgetManagerProps) {
  const router = useRouter();
  const [sections, setSections] = useState(preset.budgetSections || []);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSection = async () => {
    if (!newSectionName.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/presets/${preset.id}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newSectionName,
          order: sections.length,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка создания раздела');
      }

      router.refresh();
      setNewSectionName('');
      setShowAddSection(false);
    } catch (error) {
      alert('Ошибка создания раздела');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Смета</h2>
        <Button onClick={() => setShowAddSection(true)}>
          + Добавить раздел
        </Button>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Разделов сметы пока нет</p>
          <Button onClick={() => setShowAddSection(true)}>
            Создать первый раздел
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section: any) => (
            <div key={section.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{section.name}</h3>
                  <p className="text-sm text-gray-600">
                    Подразделов: {section.subsections?.length || 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {section.totalAmount.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>

              {section.subsections && section.subsections.length > 0 && (
                <div className="space-y-2 mt-4 pt-4 border-t">
                  {section.subsections.map((subsection: any) => (
                    <div
                      key={subsection.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm text-gray-700">
                        {subsection.subsectionType?.name || subsection.name}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {subsection.totalAmount.toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="text-sm">
                  Редактировать
                </Button>
                <Button variant="outline" className="text-sm">
                  + Подраздел
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddSection && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3 text-gray-900">Новый раздел сметы</h3>
          <div className="space-y-3">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Название раздела (например: Черновые работы)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddSection} disabled={loading || !newSectionName.trim()}>
                {loading ? 'Создание...' : 'Создать'}
              </Button>
              <Button onClick={() => {
                setShowAddSection(false);
                setNewSectionName('');
              }} variant="outline">
                Отмена
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              После создания автоматически будут добавлены подразделы: Работа, Материал, Доставка, Спецификация
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
