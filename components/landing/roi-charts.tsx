'use client';

import { type FC } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface ROIChartsProps {
  currentAnnualCost: number;
  totalAnnualSavings: number;
  threeYearSavings: number;
  threeYearCost: number;
  astraCost: number;
  turnoverSavings: number;
  timeSavings: number;
}

/**
 * ROI Charts Component
 *
 * Visualizes ROI calculator results with 3 chart types:
 * - Bar Chart: Current vs With Astra comparison
 * - Line Chart: 3-year savings projection
 * - Pie Chart: Savings breakdown
 */
export const ROICharts: FC<ROIChartsProps> = ({
  currentAnnualCost,
  totalAnnualSavings,
  threeYearSavings,
  threeYearCost,
  astraCost,
  turnoverSavings,
  timeSavings,
}) => {
  // Bar Chart Data: Current vs With Astra
  const comparisonData = [
    {
      name: 'Текущие потери',
      value: currentAnnualCost,
      fill: '#ef4444',
    },
    {
      name: 'С Astra',
      value: astraCost,
      fill: '#22c55e',
    },
  ];

  // Line Chart Data: 3-year projection
  const projectionData = [
    { year: 'Год 1', savings: totalAnnualSavings, cost: astraCost },
    { year: 'Год 2', savings: totalAnnualSavings * 2, cost: astraCost * 2 },
    { year: 'Год 3', savings: totalAnnualSavings * 3, cost: astraCost * 3 },
  ];

  // Pie Chart Data: Savings breakdown
  const savingsBreakdown = [
    { name: 'Экономия на текучке', value: turnoverSavings, fill: '#0ea5e9' },
    { name: 'Экономия времени', value: timeSavings, fill: '#8b5cf6' },
  ];

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
      notation: value >= 1000000 ? 'compact' : 'standard',
    }).format(value);
  };

  const formatCompactCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)} млн ₽`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)} тыс ₽`;
    }
    return `${value} ₽`;
  };

  return (
    <div className="space-y-6">
      {/* Bar Chart: Current vs With Astra */}
      <Card className="p-6">
        <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Сравнение Затрат
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              style={{ fontSize: '14px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCompactCurrency(value)}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Экономия:{' '}
          <span className="font-bold text-green-600">
            {formatCurrency(currentAnnualCost - astraCost)}
          </span>{' '}
          ({Math.round(((currentAnnualCost - astraCost) / currentAnnualCost) * 100)}%)
        </p>
      </Card>

      {/* Line Chart: 3-Year Projection */}
      <Card className="p-6">
        <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Прогноз Экономии на 3 Года
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={projectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" stroke="#64748b" style={{ fontSize: '14px' }} />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCompactCurrency(value)}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="savings"
              name="Накопленная экономия"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 6 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="cost"
              name="Затраты на Astra"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Чистая прибыль за 3 года:{' '}
          <span className="font-bold text-green-600">
            {formatCurrency(threeYearSavings - threeYearCost)}
          </span>
        </p>
      </Card>

      {/* Pie Chart: Savings Breakdown */}
      <Card className="p-6">
        <h4 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Структура Экономии
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={savingsBreakdown}
              cx="50%"
              cy="50%"
              labelLine={false}
              // Recharts doesn't export PieLabelRenderProps type
              // Using implicit any until recharts v3.4+ exposes label render types
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              label={(entry: any) =>
                `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              style={{ fontSize: '14px' }}
            >
              {savingsBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#0ea5e9]" />
              <span className="text-gray-600 dark:text-gray-400">Текучка</span>
            </div>
            <p className="mt-1 font-bold text-gray-900 dark:text-white">
              {formatCurrency(turnoverSavings)}
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#8b5cf6]" />
              <span className="text-gray-600 dark:text-gray-400">Время HR</span>
            </div>
            <p className="mt-1 font-bold text-gray-900 dark:text-white">
              {formatCurrency(timeSavings)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
