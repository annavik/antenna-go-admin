'use client';

import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TaxonForm } from './taxon-form';

export const EditTaxon = ({ taxon }: { taxon: Tables<'taxa'> }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <TaxonForm
            defaultFormValues={taxon}
            isLoading={isLoading}
            onSubmit={async (formValues) => {
                try {
                    setIsLoading(true);
                    const { error } = await supabase
                        .from('taxa')
                        .upsert({ ...formValues, taxa_list_id: taxon.taxa_list_id });
                    if (error) {
                        throw error;
                    }
                    router.replace(`/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}`);
                } catch (error) {
                    // TODO: Show message
                } finally {
                    setIsLoading(false);
                    router.refresh();
                }
            }}
            title="Edit taxon"
        />
    );
};
