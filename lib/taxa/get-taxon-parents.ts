import { Tables } from '@/lib/supabase/database.types';
import { RANKS } from './constants';
import { getTaxonInfo } from './get-taxon-info';

export const getTaxonParents = (taxon: Tables<'taxa'>): { label: string; rank: string }[] => {
    const { rank } = getTaxonInfo(taxon);

    return RANKS.filter((key) => key !== rank && taxon[key]).map((key) => ({
        label: taxon[key],
        rank: key
    }));
};
