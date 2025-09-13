export interface INatTaxon {
    id: number;
    rank: string;
    name: string;
    default_photo?: {
        attribution: string;
        medium_url: string;
        square_url: string;
    };
    preferred_common_name: string;
}

export interface INatTaxonDetails extends INatTaxon {
    ancestors: {
        id: number;
        rank: string;
        name: string;
    }[];
}
