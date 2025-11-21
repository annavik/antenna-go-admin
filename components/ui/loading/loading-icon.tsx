import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

export const LoadingIcon = ({ className }: { className?: string }) => (
    <Loader2Icon className={cn('w-4 h-4 animate-spin', className)} />
);
