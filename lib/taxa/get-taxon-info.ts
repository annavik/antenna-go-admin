import { Tables } from '@/lib/supabase/database.types';
import { RANKS } from './constants';

const capitalize = (value: string) => String(value).charAt(0).toUpperCase() + String(value).slice(1);

export const getTaxonInfo = (taxon: Tables<'taxa'>): { rank?: string; name?: string; label: string } => {
    let rank: string;
    let name: string;
    let label: string;

    RANKS.forEach((key) => {
        if (taxon[key]?.length) {
            rank = key;
            name = taxon[key];
        }
    });

    if (rank && name) {
        label = rank === 'species' ? name : `${capitalize(rank)} ${name}`;
    } else {
        label = 'New taxon';
    }

    return { rank, name, label };
};
