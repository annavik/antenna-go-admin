'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TaxonForm } from './taxon-form';

export const AddTaxon = ({ taxaListId }: { taxaListId: string }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <TaxonForm
            isLoading={isLoading}
            onBack={() => router.back()}
            onSubmit={async (formValues) => {
                try {
                    setIsLoading(true);
                    const { data: taxon, error } = await supabase
                        .from('taxa')
                        .insert({ ...formValues, taxa_list_id: taxaListId })
                        .select()
                        .maybeSingle();
                    if (error) {
                        throw error;
                    }
                    router.replace(`/taxa-list/${taxaListId}/taxon/${taxon.id}`);
                } catch (error) {
                    // TODO: Show message
                } finally {
                    setIsLoading(false);
                    router.refresh();
                }
            }}
            title="Add taxon"
        />
    );
};
