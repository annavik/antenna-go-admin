import { Tables } from '@/lib/supabase/database.types';

export type TaxonDetails = Tables<'taxa'> & { tags: Tables<'tags'>[] } & {
    label: string;
    name?: string;
    rank?: string;
};

export interface INatTaxon {
    id: number;
    rank: string;
    name: string;
    default_photo?: {
        square_url: string;
    };
    taxon_photos: {
        photo: {
            original_url?: string;
            small_url?: string;
            attribution?: string;
        };
    }[];
    preferred_common_name: string;
}

export interface INatTaxonDetails extends INatTaxon {
    ancestors: {
        id: number;
        rank: string;
        name: string;
    }[];
}

export interface GBIFTaxon {
    key: number;
    rank: string;
    canonicalName: string;
    phylum?: string;
    class?: string;
    order?: string;
    superfamily?: string;
    family?: string;
    subfamily?: string;
    tribe?: string;
    genus?: string;
    species?: string;
}
