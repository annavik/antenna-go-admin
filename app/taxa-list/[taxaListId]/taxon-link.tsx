'use client';

import { Card } from '@/components/ui/card';
import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { useParams } from 'next/navigation';

export const TaxonLink = ({ taxaListId, taxon }: { taxaListId: number; taxon: Tables<'taxa'> }) => {
    const params = useParams();
    const { label } = getTaxonInfo(taxon);
    const isActive = Number(params.taxonId) === taxon.id;

    return (
        <Card
            description={taxon.common_name ? `(${taxon.common_name})` : null}
            href={`/taxa-list/${taxaListId}/taxon/${taxon.id}`}
            image={taxon.cover_image_url}
            isActive={isActive}
            label={label}
        />
    );
};
