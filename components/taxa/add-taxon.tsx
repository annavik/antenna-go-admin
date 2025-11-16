import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';

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
        <ButtonTooltip content="Add new taxon">
            <Button onClick={onCreate} size="icon" variant="ghost">
                {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : <PlusIcon className="w-4 h-4" />}
            </Button>
        </ButtonTooltip>
    );
};
