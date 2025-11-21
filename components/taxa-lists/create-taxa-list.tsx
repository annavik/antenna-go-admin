'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';

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
            router.push(`/admin/taxa-list/${taxaList.id}`);
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <ButtonTooltip content="Create new taxa list">
            <Button onClick={onCreate} size="icon" variant="ghost">
                {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <PlusIcon className="w-4 h-4" />}
            </Button>
        </ButtonTooltip>
    );
};
