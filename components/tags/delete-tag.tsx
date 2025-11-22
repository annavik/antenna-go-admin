'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteDialog } from '../ui/delete-dialog';

export const DeleteTag = ({ tagId }: { tagId: string }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.from('tags').delete().eq('id', tagId);
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
        <DeleteDialog
            description="Are you sure you want to delete this tag?"
            isLoading={isLoading}
            onDelete={onDelete}
            title="Delete tag"
        />
    );
};
