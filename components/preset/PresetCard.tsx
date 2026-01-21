import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

interface PresetCardProps {
  preset: {
    id: string;
    name: string;
    style?: string | null;
    budgetCategory?: string | null;
    basePrice: number;
    duration?: number | null;
    totalArea?: number | null;
    description?: string | null;
  };
}

export default function PresetCard({ preset }: PresetCardProps) {
  return (
    <Card hover className="p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{preset.name}</h3>
        {preset.style && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
            {preset.style}
          </span>
        )}
        {preset.budgetCategory && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {preset.budgetCategory}
          </span>
        )}
      </div>
      
      {preset.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{preset.description}</p>
      )}
      
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        {preset.totalArea && <span>{preset.totalArea} м²</span>}
        {preset.duration && <span>{preset.duration} дней</span>}
      </div>
      
      <div className="text-2xl font-bold text-gray-900 mb-4">
        от {preset.basePrice.toLocaleString('ru-RU')} ₽
      </div>
      
      <Button href={`/catalog/${preset.id}`} className="w-full">
        Подробнее
      </Button>
    </Card>
  );
}
