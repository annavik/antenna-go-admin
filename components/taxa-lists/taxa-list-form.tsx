import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import { Tables } from '@/lib/supabase/database.types';
import { useState } from 'react';
import { FormTextarea } from '../forms/form-textarea';
import { LoadingIcon } from '../ui/loading/loading-icon';

export const TaxaListForm = ({
    defaultFormValues = {},
    isLoading,
    onCancel,
    onSubmit
}: {
    defaultFormValues?: Partial<Tables<'taxa_lists'>>;
    isLoading: boolean;
    onCancel: () => void;
    onSubmit: (formValues: Partial<Tables<'taxa_lists'>>) => void;
}) => {
    const [formValues, setFormValues] = useState(defaultFormValues);

    return (
        <form
            className="grid gap-8"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(formValues);
            }}
        >
            <FormInput
                label="Name"
                onValueChange={(value) => setFormValues((prev) => ({ ...prev, name: value }))}
                required
                value={formValues.name}
            />
            <FormTextarea
                label="Description"
                onValueChange={(value) => setFormValues((prev) => ({ ...prev, description: value }))}
                value={formValues.description}
            />
            <div className="flex items-center justify-end gap-4">
                <Button onClick={onCancel} variant="ghost">
                    <span className="pt-0.5">Cancel</span>
                </Button>
                <Button variant="success" type="submit">
                    <span className="pt-0.5">Save</span>
                    {isLoading ? <LoadingIcon /> : null}
                </Button>
            </div>
        </form>
    );
};
