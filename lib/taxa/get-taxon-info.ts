import { Tables } from '@/lib/supabase/database.types';
import { RANKS } from './constants';

const capitalize = (value: string) => String(value).charAt(0).toUpperCase() + String(value).slice(1);

export const getTaxonInfo = (taxon: Tables<'taxa'>): { label: string; rank?: string } => {
    let label = 'New taxon';
    let rank: string;

    RANKS.forEach((key) => {
        if (taxon[key]?.length) {
            label = taxon[key];
            rank = key;
        }
    });

    if (rank && rank !== 'species') {
        label = `${capitalize(rank)} ${label}`;
    }

    return { label, rank };
};
