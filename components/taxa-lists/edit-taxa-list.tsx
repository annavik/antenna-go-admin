'use client';

import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { Loader2Icon, PenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteTaxaList } from './delete-taxa-list';
import { FormTextarea } from '../forms/form-textarea';

export const EditTaxaList = ({ taxaList }: { taxaList: Tables<'taxa_lists'> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();
    const [formValues, setFormValues] = useState(taxaList);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.from('taxa_lists').upsert(formValues);
            if (error) {
                throw error;
            }
            setIsOpen(false);
            // TODO: Show message
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button type="button" size="icon" variant="ghost">
                            <PenIcon className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <span className="pt-0.5">Edit taxa list</span>
                </TooltipContent>
            </Tooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit taxa list</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <form
                    className="grid gap-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <FormInput
                        label="Name"
                        value={formValues.name}
                        onValueChange={(value) => setFormValues((prev) => ({ ...prev, name: value }))}
                    />
                    <FormTextarea
                        label="Description"
                        value={formValues.comments}
                        onValueChange={(value) => setFormValues((prev) => ({ ...prev, comments: value }))}
                    />
                    <div className="flex items-center justify-end gap-4">
                        <DeleteTaxaList taxaListId={taxaList.id} />
                        <Button variant="success" type="submit">
                            <span className="pt-0.5">Save</span>
                            {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : null}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
