'use client';

import { Tables } from '@/lib/supabase/database.types';
import { useParams } from 'next/navigation';
import { ListItem } from '../ui/list-item';

export const TaxaLists = ({ taxaLists }: { taxaLists: Tables<'taxa_lists'>[] }) => {
    const params = useParams();

    return (
        <div className="grid gap-2">
            {taxaLists.map((taxaList) => (
                <ListItem
                    key={taxaList.id}
                    description={taxaList.description}
                    href={`/admin/taxa-list/${taxaList.id}`}
                    isActive={params.taxaListId === taxaList.id}
                    label={taxaList.name}
                />
            ))}
        </div>
    );
};
