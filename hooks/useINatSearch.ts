import { INatTaxon } from '@/lib/types';
import { useEffect, useState } from 'react';

// See https://api.inaturalist.org/v1/docs/ for more info
const API_URL = 'https://api.inaturalist.org/v1';

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
        fetch(`${API_URL}/taxa/autocomplete?q=${q}&taxon_id=47120`)
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
