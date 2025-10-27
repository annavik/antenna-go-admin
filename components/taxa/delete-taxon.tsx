'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const DeleteTaxon = ({ taxaListId, taxonId }: { taxaListId: number; taxonId: number }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.from('taxa').delete().eq('id', taxonId);
            if (error) {
                throw error;
            }
            router.replace(`/taxa-list/${taxaListId}`);
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
                <Button onClick={onDelete} size="icon" type="button" variant="ghost">
                    {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <TrashIcon className="w-4 h-4" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span className="pt-0.5">Delete taxon</span>
            </TooltipContent>
        </Tooltip>
    );
};
