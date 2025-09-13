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

    return {
        inat_taxon_id: `${iNatTaxon.id}`,
        ...ancestors,
        [iNatTaxon.rank]: iNatTaxon.name,
        cover_image_url: iNatTaxon.default_photo?.medium_url ?? undefined,
        cover_image_credit: iNatTaxon.default_photo?.attribution ?? undefined,
        common_name: iNatTaxon.preferred_common_name ?? undefined
    };
};
