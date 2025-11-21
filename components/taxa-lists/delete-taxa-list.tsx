'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteDialog } from '../ui/delete-dialog';

export const DeleteTaxaList = ({ taxaListId }: { taxaListId: string }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.from('taxa_lists').delete().eq('id', taxaListId);
            if (error) {
                throw error;
            }
            router.replace('/admin');
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <DeleteDialog
            description="Are you sure you want to delete this taxa list? This will also delete related taxa."
            isLoading={isLoading}
            onDelete={onDelete}
            title="Delete taxa list"
        />
    );
};
