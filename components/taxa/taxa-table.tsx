'use client';

import { LABELS, RANKS } from '@/lib/taxa/constants';
import { getActivePeriodLabel } from '@/lib/taxa/get-active-period-label';
import { TaxonDetails } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GBIFLink } from '../external-resources/gbif-link';
import { INatLink } from '../external-resources/inat-link';
import { Tag } from '../tags/tag';
import { DataTable } from '../ui/table/data-table';
import { DataTableHeader } from '../ui/table/data-table-header';

export const columns: ColumnDef<TaxonDetails>[] = [
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
                {row.original.tags.length ? (
                    <div className="flex flex-wrap gap-2">
                        {row.original.tags.map((tag) => (
                            <Tag key={tag.id} isActive tag={tag} />
                        ))}
                    </div>
                ) : null}
            </div>
        )
    },
    ...RANKS.map((rank) => ({
        accessorKey: rank,
        header: ({ column }) => <DataTableHeader column={column} label={LABELS[rank]} />
    })),
    {
        accessorKey: 'inat_taxon_id',
        header: ({ column }) => <DataTableHeader column={column} label={LABELS.inat_taxon_id} />,
        cell: ({ row }) => {
            if (!row.original.inat_taxon_id) {
                return null;
            }

            return <INatLink label={row.original.inat_taxon_id} taxonId={row.original.inat_taxon_id} />;
        }
    },
    {
        accessorKey: 'gbif_taxon_key',
        header: ({ column }) => <DataTableHeader column={column} label={LABELS.gbif_taxon_key} />,
        cell: ({ row }) => {
            if (!row.original.gbif_taxon_key) {
                return null;
            }

            return <GBIFLink label={row.original.gbif_taxon_key} taxonKey={row.original.gbif_taxon_key} />;
        }
    },
    {
        accessorKey: 'active_period_from',
        header: ({ column }) => <DataTableHeader column={column} label="Active period" />,
        cell: ({ row }) => getActivePeriodLabel(row.original)
    },
    {
        accessorKey: 'common_name',
        header: ({ column }) => <DataTableHeader column={column} label={LABELS.common_name} />
    }
];

export const TaxaTable = ({ taxa }: { taxa: TaxonDetails[] }) => {
    const router = useRouter();

    return (
        <DataTable
            columns={columns}
            data={taxa}
            defaultSorting={[{ id: 'name', desc: false }]}
            onRowClick={(row) => {
                const taxaListId = row.original.taxa_list_id;
                const taxonId = row.original.id;
                router.push(`/taxa-list/${taxaListId}/taxon/${taxonId}`);
            }}
        />
    );
};
