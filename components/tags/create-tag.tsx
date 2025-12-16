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
import { TagForm } from './tag-form';

export const CreateTag = ({ taxaListId }: { taxaListId: string }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="success">
                    <span className="pt-0.5">Create tag</span>
                    <PlusIcon className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create tag</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <TagForm
                    isLoading={isLoading}
                    onCancel={() => setIsOpen(false)}
                    onSubmit={async (formValues) => {
                        try {
                            setIsLoading(true);
                            const { error } = await supabase
                                .from('tags')
                                .insert({ ...formValues, name: formValues.name, taxa_list_id: taxaListId });
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
