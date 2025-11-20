import { GBIFTaxon } from '@/lib/types';
import { useEffect, useState } from 'react';

const API_URL = 'https://api.gbif.org/v1'; // See https://techdocs.gbif.org/en/openapi/v1/ for more info
const DATASET_KEY = 'd7dddbf4-2cf0-4f39-9b2a-bb099caae36c'; // GBIF Backbone Taxonomy
const HIGHER_TAXON_KEY = 216; // Insecta
const STATUS = 'ACCEPTED';

export const useGBIFSearch = (q: string) => {
    const [data, setData] = useState<{
        results: GBIFTaxon[];
    }>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!q.length) {
            return;
        }

        setIsLoading(true);
        fetch(
            `${API_URL}/species/search?datasetKey=${DATASET_KEY}&higherTaxonKey=${HIGHER_TAXON_KEY}&status=${STATUS}&q=${q}`
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            });
    }, [q]);

    return {
        data,
        isLoading
    };
};
