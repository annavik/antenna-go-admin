import { Tables } from '@/lib/supabase/database.types';
import { RANKS } from './constants';

export const getTaxonInfo = (taxon: Tables<'taxa'>): { label: string; rank?: string } => {
    let label: string;
    let rank: string;

    RANKS.forEach((key) => {
        if (taxon[key]?.length) {
            label = taxon[key];
            rank = key;
        }
    });

    return { label: label ?? 'New taxon', rank };
};
