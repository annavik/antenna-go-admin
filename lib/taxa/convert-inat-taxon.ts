import { INatTaxonDetails } from '../types';
import { RANKS } from './constants';

export const convertINatTaxon = (taxon: INatTaxonDetails): { [key: string]: string } => {
    const fields: { [key: string]: string } = {
        inat_taxon_id: `${taxon.id}`
    };

    RANKS.forEach((rank) => {
        const ancestor = taxon.ancestors.find((ancestor) => ancestor.rank === rank);
        if (ancestor) {
            fields[rank] = ancestor.name;
        }
    });

    if (RANKS.includes(taxon.rank)) {
        fields[taxon.rank] = taxon.name;
    }

    // Make sure photo is shared under open open license
    const photo = taxon.taxon_photos.find(({ photo }) => photo.original_url.includes('inaturalist-open-data'))?.photo;

    if (photo) {
        if (photo.original_url) {
            fields.cover_image_url = photo.original_url;
        }

        if (photo.small_url) {
            fields.cover_image_thumbnail_url = photo.small_url;
        }

        if (photo.attribution) {
            fields.cover_image_credit = photo.attribution;
        }
    }

    if (taxon.preferred_common_name) {
        fields.common_name = taxon.preferred_common_name;
    }

    return fields;
};
