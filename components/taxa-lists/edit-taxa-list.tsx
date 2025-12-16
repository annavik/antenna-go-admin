'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { PenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';
import { TaxaListForm } from './taxa-list-form';

export const EditTaxaList = ({ taxaList }: { taxaList: Tables<'taxa_lists'> }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <ButtonTooltip content="Edit taxa list">
                <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <PenIcon className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
            </ButtonTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit taxa list</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <TaxaListForm
                    defaultFormValues={taxaList}
                    isLoading={isLoading}
                    onCancel={() => setIsOpen(false)}
                    onSubmit={async (formValues) => {
                        try {
                            setIsLoading(true);
                            const { error } = await supabase
                                .from('taxa_lists')
                                .upsert({ ...formValues, name: formValues.name });
                            if (error) {
                                throw error;
                            }
                            setIsOpen(false);
                        } catch (error) {
                            // TODO: Show message
                        } finally {
                            setIsLoading(false);
                            router.refresh();
                        }
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};
