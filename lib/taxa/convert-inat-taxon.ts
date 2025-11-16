import { INatTaxonDetails } from '../types';
import { RANKS } from './constants';

export const convertINatTaxon = (iNatTaxon: INatTaxonDetails): { [key: string]: string } => {
    const ancestors = RANKS.reduce((prev: { [key: string]: string }, rank) => {
        const ancestor = iNatTaxon.ancestors.find((ancestor) => ancestor.rank === rank);
        if (ancestor) {
            prev[rank] = ancestor.name;
        }

        return prev;
    }, {});

    const fields: { [key: string]: string } = {
        inat_taxon_id: `${iNatTaxon.id}`,
        ...ancestors
    };

    if (RANKS.includes(iNatTaxon.rank)) {
        fields[iNatTaxon.rank] = iNatTaxon.name;
    }

    const taxonPhoto = iNatTaxon.taxon_photos[0].photo;
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

    if (iNatTaxon.preferred_common_name) {
        fields.common_name = iNatTaxon.preferred_common_name;
    }

    return fields;
};
