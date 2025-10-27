'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={onCreate} size="icon" variant="ghost">
                    {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <PlusIcon className="w-4 h-4" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span className="pt-0.5">Create new taxa list</span>
            </TooltipContent>
        </Tooltip>
    );
};
