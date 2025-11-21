import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

export const LoadingSection = ({ className }: { className?: string }) => (
    <div className={cn('flex items-center justify-center', className)}>
        <Loader2Icon className="w-16 h-16 text-secondary animate-spin" />
    </div>
);
