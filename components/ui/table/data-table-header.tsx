import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { Button } from '../button';

export const DataTableHeader = <TData, TValue>({ column, label }: { column: Column<TData, TValue>; label: string }) => {
    const isSorted = column.getIsSorted();
    const Icon = isSorted === 'desc' ? ArrowDownIcon : isSorted === 'asc' ? ArrowUpIcon : ArrowUpDownIcon;

    return (
        <Button
            className="-ml-3 text-foreground"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
            size="sm"
            variant="ghost"
        >
            <span className="pt-0.5">{label}</span>
            <Icon className={cn('w-4 h-4', { invisible: !isSorted })} />
        </Button>
    );
};
