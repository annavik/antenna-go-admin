'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoadingIcon } from '../ui/loading/loading-icon';

export const CreateTaxaList = () => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onCreate = async () => {
        try {
            setIsLoading(true);
            const { data: taxaList, error } = await supabase
                .from('taxa_lists')
                .insert({ name: 'New taxa list' })
                .select()
                .maybeSingle();
            if (error) {
                throw error;
            }
            router.push(`/taxa-list/${taxaList.id}`);
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <Button onClick={onCreate} variant="success">
            <PlusIcon className="w-4 h-4" />
            <span className="pt-0.5">Create taxa list</span>
            {isLoading ? <LoadingIcon /> : null}
        </Button>
    );
};
