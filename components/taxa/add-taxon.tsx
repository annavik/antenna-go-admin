'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const AddTaxon = ({ taxaListId }: { taxaListId: string }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onCreate = async () => {
        try {
            setIsLoading(true);
            const { data: taxon, error } = await supabase
                .from('taxa')
                .insert({ taxa_list_id: taxaListId })
                .select()
                .maybeSingle();
            if (error) {
                throw error;
            }
            router.push(`/taxa-list/${taxaListId}/taxon/${taxon.id}`);
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
                <span className="pt-0.5">Add new taxon</span>
            </TooltipContent>
        </Tooltip>
    );
};
