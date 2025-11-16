'use client';

import { Card } from '@/components/ui/card';
import { Tables } from '@/lib/supabase/database.types';
import { useParams } from 'next/navigation';

export const TaxaListLink = ({ taxaList }: { taxaList: Tables<'taxa_lists'> }) => {
    const params = useParams();
    const isActive = Number(params.taxaListId) === taxaList.id;

    return (
        <Card
            description={taxaList.description}
            href={`/taxa-list/${taxaList.id}`}
            isActive={isActive}
            label={taxaList.name}
        />
    );
};
