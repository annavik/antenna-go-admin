import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { Gallery, GalleryItem } from '../ui/gallery';

export const TaxaGallery = ({ taxa }: { taxa: Tables<'taxa'>[] }) => (
    <Gallery>
        {taxa.map((taxon) => {
            const { label } = getTaxonInfo(taxon);

            return (
                <GalleryItem
                    key={taxon.id}
                    description={taxon.common_name ? `(${taxon.common_name})` : null}
                    href={`/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}`}
                    image={taxon.cover_image_thumbnail_url}
                    title={label}
                />
            );
        })}
    </Gallery>
);
