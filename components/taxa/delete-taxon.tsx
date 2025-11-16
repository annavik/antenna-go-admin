import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteDialog } from '../ui/delete-dialog';

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
        <DeleteDialog
            description="Are you sure you want to delete this taxon?"
            isLoading={isLoading}
            onDelete={onDelete}
            title="Delete taxon"
        />
    );
};
