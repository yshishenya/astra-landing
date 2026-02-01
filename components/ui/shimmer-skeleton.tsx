import { type FC } from 'react';
import { cn } from '@/lib/utils';

interface ShimmerSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * ShimmerSkeleton component that provides a smooth shimmer animation effect for loading states.
 */
export const ShimmerSkeleton: FC<ShimmerSkeletonProps> = ({
  className,
  children
}) => {
  return (
    <div className={cn('relative overflow-hidden bg-gray-200', className)}>
      {/* Shimmer effect overlay */}
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

/**
 * Renders a skeleton loading component for ROI charts.
 */
export const ROIChartSkeleton: FC = () => {
  return (
    <div className="space-y-6">
      {/* Bar Chart Skeleton */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 space-y-2">
          <ShimmerSkeleton className="h-6 w-48 rounded" />
          <ShimmerSkeleton className="h-4 w-64 rounded" />
        </div>
        <div className="flex items-end justify-between gap-4">
          <ShimmerSkeleton className="h-40 w-full rounded" />
          <ShimmerSkeleton className="h-32 w-full rounded" />
        </div>
      </div>

      {/* Line Chart Skeleton */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 space-y-2">
          <ShimmerSkeleton className="h-6 w-56 rounded" />
          <ShimmerSkeleton className="h-4 w-72 rounded" />
        </div>
        <div className="space-y-3">
          <ShimmerSkeleton className="h-2 w-full rounded-full" />
          <ShimmerSkeleton className="h-2 w-5/6 rounded-full" />
          <ShimmerSkeleton className="h-2 w-4/6 rounded-full" />
          <ShimmerSkeleton className="h-48 w-full rounded" />
        </div>
      </div>

      {/* Pie Chart Skeleton */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 space-y-2">
          <ShimmerSkeleton className="h-6 w-44 rounded" />
          <ShimmerSkeleton className="h-4 w-56 rounded" />
        </div>
        <div className="flex items-center justify-center">
          <ShimmerSkeleton className="h-64 w-64 rounded-full" />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <ShimmerSkeleton className="h-4 w-24 rounded" />
          <ShimmerSkeleton className="h-4 w-28 rounded" />
        </div>
      </div>
    </div>
  );
};
