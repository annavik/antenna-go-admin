import { Tables } from '@/lib/supabase/database.types';
import { capitalize } from '../utils';
import { RANKS } from './constants';
import { getTaxonInfo } from './get-taxon-info';

export const getTaxonParents = (taxon: Tables<'taxa'>): { rank: string; name: string; label: string }[] => {
    const { rank } = getTaxonInfo(taxon);

    return RANKS.filter((key) => key !== rank && taxon[key]).map((key) => ({
        rank: key,
        name: taxon[key],
        label: `${capitalize(key)} ${taxon[key]}`
    }));
};
