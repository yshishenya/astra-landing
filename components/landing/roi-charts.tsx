'use client';

import { type FC } from 'react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
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

// Chart configuration constants
const CHART_CONFIG = {
  doughnut: {
    innerRadius: 80,
    outerRadius: 120,
    paddingAngle: 4,
  },
  bar: {
    maxSize: 120,
    barGap: 20,
  },
  animation: {
    duration: 800,
    durationLong: 1000,
    stagger: 300,
  },
  height: {
    bar: 280,
    area: 320,
    doughnut: 320,
  },
} as const;

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
 * Visualizes ROI calculator results with 3 modern chart types:
 * - Stacked Bar Chart: Current losses vs Astra cost breakdown with savings
 * - Area Chart: 3-year cumulative savings projection
 * - Doughnut Chart: Savings breakdown (turnover reduction vs time savings)
 *
 * Features:
 * - Gradient fills for visual appeal
 * - Smooth animations (800-1000ms)
 * - Interactive tooltips with currency formatting
 * - Responsive design for all screen sizes
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
  // Bar Chart Data: Current vs With Astra (with savings breakdown)
  const comparisonData = [
    {
      name: 'Текущие потери',
      value: currentAnnualCost,
    },
    {
      name: 'С Astra',
      astraCost: astraCost,
      savings: totalAnnualSavings - astraCost,
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
      <Card className="overflow-hidden p-6" aria-labelledby="cost-comparison-title">
        <h4 id="cost-comparison-title" className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Сравнение Затрат
        </h4>
        <div role="img" aria-label="График сравнения текущих потерь от текучести кадров и затрат с использованием Astra, показывающий экономию">
          <ResponsiveContainer width="100%" height={CHART_CONFIG.height.bar}>
            <BarChart
            data={comparisonData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barGap={CHART_CONFIG.bar.barGap}
          >
            <defs>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8}/>
              </linearGradient>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#0284c7" stopOpacity={0.8}/>
              </linearGradient>
              <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              style={{ fontSize: '13px', fontWeight: 500 }}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCompactCurrency(value)}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                padding: '12px',
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Bar dataKey="value" fill="url(#colorLoss)" radius={[8, 8, 0, 0]} maxBarSize={CHART_CONFIG.bar.maxSize} animationDuration={CHART_CONFIG.animation.duration} />
            <Bar dataKey="astraCost" fill="url(#colorCost)" stackId="astra" radius={[0, 0, 0, 0]} maxBarSize={CHART_CONFIG.bar.maxSize} animationDuration={CHART_CONFIG.animation.duration} animationBegin={CHART_CONFIG.animation.stagger} />
            <Bar dataKey="savings" fill="url(#colorSavings)" stackId="astra" radius={[8, 8, 0, 0]} maxBarSize={CHART_CONFIG.bar.maxSize} animationDuration={CHART_CONFIG.animation.duration} animationBegin={CHART_CONFIG.animation.stagger} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-red-500 to-red-600" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Текущие</span>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {formatCompactCurrency(currentAnnualCost)}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Затраты</span>
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {formatCompactCurrency(astraCost)}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-1 flex items-center justify-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-green-500 to-green-600" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Экономия</span>
            </div>
            <p className="text-sm font-bold text-green-600 dark:text-green-400">
              {formatCompactCurrency(totalAnnualSavings - astraCost)}
            </p>
          </div>
        </div>
      </Card>

      {/* Area Chart: 3-Year Projection */}
      <Card className="overflow-hidden p-6" aria-labelledby="projection-title">
        <h4 id="projection-title" className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Прогноз Экономии на 3 Года
        </h4>
        <div role="img" aria-label="График прогноза накопленной экономии и затрат на Astra за 3 года">
          <ResponsiveContainer width="100%" height={CHART_CONFIG.height.area}>
            <AreaChart data={projectionData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorSavingsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="colorCostArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis
              dataKey="year"
              stroke="#6b7280"
              style={{ fontSize: '13px', fontWeight: 500 }}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => formatCompactCurrency(value)}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                padding: '12px',
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend
              wrapperStyle={{ paddingTop: '16px' }}
              iconType="circle"
            />
            <Area
              type="monotone"
              dataKey="savings"
              name="Накопленная экономия"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorSavingsArea)"
              dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, strokeWidth: 2 }}
              animationDuration={CHART_CONFIG.animation.durationLong}
            />
            <Area
              type="monotone"
              dataKey="cost"
              name="Затраты на Astra"
              stroke="#0ea5e9"
              strokeWidth={3}
              fill="url(#colorCostArea)"
              dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, strokeWidth: 2 }}
              animationDuration={CHART_CONFIG.animation.durationLong}
              animationBegin={CHART_CONFIG.animation.stagger}
            />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:from-green-900/20 dark:to-emerald-900/20">
          <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            Чистая прибыль за 3 года:{' '}
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {formatCurrency(threeYearSavings - threeYearCost)}
            </span>
          </p>
        </div>
      </Card>

      {/* Doughnut Chart: Savings Breakdown */}
      <Card className="overflow-hidden p-6" aria-labelledby="savings-breakdown-title">
        <h4 id="savings-breakdown-title" className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          Структура Экономии
        </h4>
        <div role="img" aria-label="Круговая диаграмма структуры экономии: экономия на текучести кадров и экономия времени HR">
          <ResponsiveContainer width="100%" height={CHART_CONFIG.height.doughnut}>
            <PieChart>
            <defs>
              <linearGradient id="gradientTurnover" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="gradientTime" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <Pie
              data={savingsBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={CHART_CONFIG.doughnut.innerRadius}
              outerRadius={CHART_CONFIG.doughnut.outerRadius}
              paddingAngle={CHART_CONFIG.doughnut.paddingAngle}
              dataKey="value"
              animationDuration={CHART_CONFIG.animation.durationLong}
              animationBegin={0}
            >
              {savingsBreakdown.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? 'url(#gradientTurnover)' : 'url(#gradientTime)'}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
                padding: '12px',
              }}
            />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-800 dark:bg-cyan-900/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Экономия на текучке</span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(turnoverSavings)}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {turnoverSavings + timeSavings > 0
                ? Math.round((turnoverSavings / (turnoverSavings + timeSavings)) * 100)
                : 0}% от общей экономии
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Экономия времени HR</span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(timeSavings)}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {turnoverSavings + timeSavings > 0
                ? Math.round((timeSavings / (turnoverSavings + timeSavings)) * 100)
                : 0}% от общей экономии
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
