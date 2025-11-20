import { INatTaxon } from '@/lib/types';
import { useEffect, useState } from 'react';

const API_URL = 'https://api.inaturalist.org/v1'; // See https://api.inaturalist.org/v1/docs/ for more info
const TAXON_ID = 47158; // Insecta

export const useINatSearch = (q: string) => {
    const [data, setData] = useState<{
        results: INatTaxon[];
    }>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!q.length) {
            return;
        }

        setIsLoading(true);
        fetch(`${API_URL}/taxa/autocomplete?taxon_id=${TAXON_ID}&q=${q}`)
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
