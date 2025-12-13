'use client';

import { Tables } from '@/lib/supabase/database.types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../ui/table/data-table';
import { DataTableHeader } from '../ui/table/data-table-header';
import { DeleteTag } from './delete-tag';
import { EditTag } from './edit-tag';
import { Tag } from './tag';

export const columns: ColumnDef<Tables<'tags'>>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableHeader column={column} label="Tag" />,
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-2">
                <Tag isActive tag={row.original} />
            </div>
        )
    },
    {
        accessorKey: 'description',
        header: ({ column }) => <DataTableHeader column={column} label="Description" />
    },
    {
        accessorKey: 'actions',
        enableSorting: false,
        header: ({ column }) => <DataTableHeader column={column} label="" />,
        cell: ({ row }) => (
            <div key={row.original.id} className="flex items-center justify-end gap-4">
                <DeleteTag tagId={row.original.id} />
                <EditTag tag={row.original} />
            </div>
        )
    }
];

export const TagsTable = ({ tags }: { tags: Tables<'tags'>[] }) => (
    <DataTable columns={columns} data={tags} defaultSorting={[{ id: 'name', desc: false }]} />
);
