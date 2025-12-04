import { TaxonDetails } from '@/lib/types';
import { Gallery, GalleryItem } from '../ui/gallery';

export const TaxaGallery = ({ taxa }: { taxa: TaxonDetails[] }) => (
    <Gallery>
        {taxa.map((taxon) => (
            <GalleryItem
                key={taxon.id}
                description={taxon.common_name ? `(${taxon.common_name})` : null}
                href={`/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}`}
                image={taxon.cover_image_thumbnail_url}
                title={taxon.label}
            />
        ))}
    </Gallery>
);
