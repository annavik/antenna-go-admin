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
