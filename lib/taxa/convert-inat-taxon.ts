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

    if (iNatTaxon.default_photo?.medium_url) {
        fields.cover_image_url = iNatTaxon.default_photo.medium_url;
    }

    if (iNatTaxon.default_photo?.square_url) {
        fields.cover_image_thumbnail_url = iNatTaxon.default_photo.square_url;
    }

    if (iNatTaxon.default_photo?.attribution) {
        fields.cover_image_credit = iNatTaxon.default_photo.attribution;
    }

    if (iNatTaxon.preferred_common_name) {
        fields.common_name = iNatTaxon.preferred_common_name;
    }

    return fields;
};
