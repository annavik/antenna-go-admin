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

    const taxonPhoto = taxon.taxon_photos[0]?.photo;
    if (taxonPhoto) {
        if (taxonPhoto.original_url) {
            fields.cover_image_url = taxonPhoto.original_url;
        }

        if (taxonPhoto.small_url) {
            fields.cover_image_thumbnail_url = taxonPhoto.small_url;
        }

        if (taxonPhoto.attribution) {
            fields.cover_image_credit = taxonPhoto.attribution;
        }
    }

    if (taxon.preferred_common_name) {
        fields.common_name = taxon.preferred_common_name;
    }

    return fields;
};
