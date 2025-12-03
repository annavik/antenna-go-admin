'use client';

import { Tables } from '@/lib/supabase/database.types';
import { LABELS, RANKS } from '@/lib/taxa/constants';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { DataTable } from '../ui/table/data-table';
import { DataTableHeader } from '../ui/table/data-table-header';

export const columns: ColumnDef<Tables<'taxa'>>[] = [
    {
        accessorKey: 'cover_image_thumbnail_url',
        header: () => <></>,
        cell: ({ row }) => (
            <div className="h-16 w-16">
                <img
                    alt=""
                    className="w-full h-full object-cover bg-muted rounded-md border"
                    src={row.original.cover_image_thumbnail_url}
                />
            </div>
        )
    },
    ...RANKS.map((rank) => ({
        accessorKey: rank,
        header: ({ column }) => <DataTableHeader column={column} label={LABELS[rank]} />
    })),
    {
        accessorKey: 'common_name',
        header: ({ column }) => <DataTableHeader column={column} label={LABELS.common_name} />
    }
];

export const TaxaTable = ({ taxa }: { taxa: Tables<'taxa'>[] }) => {
    const router = useRouter();

    return (
        <DataTable
            data={taxa}
            columns={columns}
            onRowClick={(row) => {
                const taxaListId = row.original.taxa_list_id;
                const taxonId = row.original.id;
                router.push(`/taxa-list/${taxaListId}/taxon/${taxonId}`);
            }}
        />
    );
};
