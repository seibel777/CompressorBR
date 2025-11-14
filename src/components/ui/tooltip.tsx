'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  className,
  ...props
}: TooltipPrimitive.TooltipContentProps) {
  return (
    <TooltipPrimitive.Content
      className={cn(
        'rounded-xl bg-slate-900/95 px-3 py-2 text-xs text-white shadow-lg',
        className
      )}
      {...props}
    />
  );
}
