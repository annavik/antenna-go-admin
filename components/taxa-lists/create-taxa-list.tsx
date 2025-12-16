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
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TaxaListForm } from './taxa-list-form';

export const CreateTaxaList = () => {
    const supabase = createClient();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="success">
                    <span className="pt-0.5">Create taxa list</span>
                    <PlusIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create taxa list</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <TaxaListForm
                    isLoading={isLoading}
                    onCancel={() => setIsOpen(false)}
                    onSubmit={async (formValues) => {
                        try {
                            setIsLoading(true);
                            const { data: taxaList, error } = await supabase
                                .from('taxa_lists')
                                .insert({ ...formValues, name: formValues.name })
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
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};
