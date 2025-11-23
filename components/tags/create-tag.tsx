'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';
import { LoadingIcon } from '../ui/loading/loading-icon';

export const CreateTag = ({ taxaListId }: { taxaListId: string }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onCreate = async () => {
        try {
            setIsLoading(true);
            const { data: taxon, error } = await supabase
                .from('tags')
                .insert({ taxa_list_id: taxaListId, name: 'New tag' })
                .select()
                .maybeSingle();
            if (error) {
                throw error;
            }
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <ButtonTooltip content="Create new tag">
            <Button onClick={onCreate} size="icon" variant="ghost">
                {isLoading ? <LoadingIcon /> : <PlusIcon className="w-4 h-4" />}
            </Button>
        </ButtonTooltip>
    );
};
