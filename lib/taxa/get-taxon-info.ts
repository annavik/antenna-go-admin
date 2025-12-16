import { Tables } from '@/lib/supabase/database.types';
import { capitalize } from '../utils';
import { RANKS } from './constants';

export const getTaxonInfo = (taxon: Partial<Tables<'taxa'>>): { label: string; name?: string; rank?: string } => {
    let label: string;
    let name: string;
    let rank: string;

    RANKS.forEach((key) => {
        if (taxon[key]?.length) {
            rank = key;
            name = taxon[key];
        }
    });

    if (rank && name) {
        label = rank === 'species' ? name : `${capitalize(rank)} ${name}`;
    } else {
        label = 'Unknown taxon';
    }

    return { label, name, rank };
};
