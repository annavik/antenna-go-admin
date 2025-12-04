'use client';

import { Tables } from '@/lib/supabase/database.types';
import { LABELS, RANKS } from '@/lib/taxa/constants';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { DataTable } from '../ui/table/data-table';
import { DataTableHeader } from '../ui/table/data-table-header';
import { ImageIcon } from 'lucide-react';

export const columns: ColumnDef<Tables<'taxa'> & { label: string; name?: string }>[] = [
    {
        accessorKey: 'cover_image_thumbnail_url',
        header: () => <></>,
        cell: ({ row }) => (
            <div className="h-16 w-16 flex items-center justify-center -mr-3 bg-muted rounded-md border overflow-hidden">
                {row.original.cover_image_thumbnail_url ? (
                    <img alt="" className="w-full h-full object-cover" src={row.original.cover_image_thumbnail_url} />
                ) : (
                    <ImageIcon className="w-4 h-4 text-foreground/50" />
                )}
            </div>
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableHeader column={column} label="Taxon" />,
        cell: ({ row }) => (
            <div className="grid gap-1">
                <span className="body-base font-medium whitespace-nowrap">{row.original.label}</span>
                {row.original.common_name ? (
                    <span className="body-small text-muted-foreground">({row.original.common_name})</span>
                ) : null}
            </div>
        )
    },
    ...RANKS.map((rank) => ({
        accessorKey: rank,
        header: ({ column }) => <DataTableHeader column={column} label={LABELS[rank]} />
    }))
];

export const TaxaTable = ({ taxa }: { taxa: Tables<'taxa'>[] }) => {
    const router = useRouter();

    const data = useMemo(
        () =>
            taxa.map((taxon) => {
                const { label, name } = getTaxonInfo(taxon);

                return { ...taxon, label, name };
            }),
        [taxa]
    );

    return (
        <DataTable
            columns={columns}
            data={data}
            defaultSorting={[{ id: 'name', desc: false }]}
            onRowClick={(row) => {
                const taxaListId = row.original.taxa_list_id;
                const taxonId = row.original.id;
                router.push(`/taxa-list/${taxaListId}/taxon/${taxonId}`);
            }}
        />
    );
};
