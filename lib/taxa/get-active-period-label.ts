import { Tables } from '@/lib/supabase/database.types';
import { MONTHS } from './constants';

export const getActivePeriodLabel = (taxon: Tables<'taxa'>): string => {
    const from = MONTHS.find((month) => month.value === taxon.active_period_from)?.label;
    const to = MONTHS.find((month) => month.value === taxon.active_period_to)?.label;

    if (from) {
        if (to && to !== from) {
            return `${from} - ${to}`;
        } else {
            return from;
        }
    } else if (to) {
        return to;
    }

    return undefined;
};
