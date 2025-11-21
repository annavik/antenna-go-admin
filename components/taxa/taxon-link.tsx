import { Card } from '@/components/ui/card';
import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { useParams } from 'next/navigation';

export const TaxonLink = ({ taxon }: { taxon: Tables<'taxa'> }) => {
    const params = useParams();
    const { label } = getTaxonInfo(taxon);
    const isActive = params.taxonId === taxon.id;

    return (
        <Card
            description={taxon.common_name ? `(${taxon.common_name})` : null}
            href={`/admin/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}`}
            image={taxon.cover_image_thumbnail_url}
            isActive={isActive}
            label={label}
            withImage
        />
    );
};
