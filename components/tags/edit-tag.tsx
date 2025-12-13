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
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { PenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormColor } from '../forms/form-color';
import { ButtonTooltip } from '../ui/button-tooltip';
import { LoadingIcon } from '../ui/loading/loading-icon';
import { FormTextarea } from '../forms/form-textarea';

export const EditTag = ({ tag }: { tag: Tables<'tags'> }) => {
    const supabase = createClient();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState(tag);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.from('tags').upsert(formValues);
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

    useEffect(() => setFormValues(tag), [isOpen, tag]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <ButtonTooltip content="Edit tag">
                <DialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <PenIcon className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
            </ButtonTooltip>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit tag</DialogTitle>
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
                        value={formValues.description}
                        onValueChange={(value) => setFormValues((prev) => ({ ...prev, description: value }))}
                    />
                    <FormColor
                        label="Color"
                        value={formValues.color}
                        onValueChange={(value) => setFormValues((prev) => ({ ...prev, color: value }))}
                    />
                    <div className="flex items-center justify-end gap-4">
                        <Button onClick={() => setIsOpen(false)} variant="ghost">
                            <span className="pt-0.5">Cancel</span>
                        </Button>
                        <Button variant="success" type="submit">
                            <span className="pt-0.5">Save</span>
                            {isLoading ? <LoadingIcon /> : null}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
