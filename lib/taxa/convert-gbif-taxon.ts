import { GBIFTaxon } from '../types';
import { RANKS } from './constants';

export const convertGBIFTaxon = (taxon: GBIFTaxon): { [key: string]: string } => {
    const fields: { [key: string]: string } = {
        gbif_taxon_key: `${taxon.key}`
    };

    RANKS.forEach((rank) => {
        if (taxon[rank]) {
            fields[rank] = taxon[rank];
        }
    });

    return fields;
};
