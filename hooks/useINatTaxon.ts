import { INatTaxonDetails } from '@/lib/types';
import { useEffect, useState } from 'react';

// See https://api.inaturalist.org/v1/docs/ for more info
const API_URL = 'https://api.inaturalist.org/v1';

export const useINatTaxon = (id: number) => {
    const [data, setData] = useState<{
        results: INatTaxonDetails[];
    }>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);
        fetch(`${API_URL}/taxa/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setIsLoading(false);
            });
    }, [id]);

    return {
        data,
        isLoading
    };
};
