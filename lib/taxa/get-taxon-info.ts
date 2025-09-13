import { Tables } from '../supabase/database.types';
import { RANKS } from './constants';

export const getTaxonInfo = (taxon: Tables<'taxa'>): { label?: string; rank?: string } => {
    let label: string;
    let rank: string;

    RANKS.forEach((key) => {
        if (taxon[key]) {
            label = taxon[rank];
            rank = key;
        }
    });

    return { label, rank };
};
