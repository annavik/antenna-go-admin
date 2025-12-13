import { cn } from '@/lib/utils';
import {
    ColumnDef,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    defaultSorting?: SortingState;
    onRowClick?: (row: Row<TData>) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    defaultSorting = [],
    onRowClick
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>(defaultSorting);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting
        }
    });

    return (
        <div className="overflow-hidden bg-background rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.map((row) => (
                        <TableRow
                            key={row.id}
                            className={cn({ 'cursor-pointer': onRowClick })}
                            data-state={row.getIsSelected() && 'selected'}
                            onClick={() => onRowClick?.(row)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
