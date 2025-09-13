'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { INatControl } from './inat-control';
import { TaxonHeader } from './taxon-header';

export const TaxonForm = ({ taxon }: { taxon: Tables<'taxa'> }) => {
    const supabase = createClient();
    const router = useRouter();
    const [formValues, setFormValues] = useState(taxon);
    const [isLoading, setIsLoading] = useState(false);

    const onReset = () => setFormValues(taxon);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.from('taxa').upsert(formValues);
            if (error) {
                throw error;
            }
            // TODO: Show message
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
            router.refresh();
        }
    };

    return (
        <div>
            <TaxonHeader taxon={formValues} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="grid gap-16 p-8"
            >
                <FormSection label="External resources">
                    <div className="grid grid-cols-2 gap-8">
                        <FormControl label="iNat taxon ID">
                            <INatControl taxon={formValues} onTaxonChange={setFormValues} />
                        </FormControl>
                    </div>
                </FormSection>
                <FormSection label="Taxonomy">
                    <div className="grid grid-cols-2 gap-8">
                        <FormInput
                            label="Phylum"
                            value={formValues.phylum}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, phylum: value }))}
                        />
                        <FormInput
                            label="Class"
                            value={formValues.class}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, class: value }))}
                        />
                        <FormInput
                            label="Order"
                            value={formValues.order}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, order: value }))}
                        />
                        <FormInput
                            label="Superfamily"
                            value={formValues.superfamily}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, superfamily: value }))}
                        />
                        <FormInput
                            label="Family"
                            value={formValues.family}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, family: value }))}
                        />
                        <FormInput
                            label="Subfamily"
                            value={formValues.subfamily}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, subfamily: value }))}
                        />
                        <FormInput
                            label="Tribe"
                            value={formValues.tribe}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, tribe: value }))}
                        />
                        <FormInput
                            label="Genus"
                            value={formValues.genus}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, genus: value }))}
                        />
                        <FormInput
                            label="Species"
                            value={formValues.species}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, species: value }))}
                        />
                    </div>
                </FormSection>
                <FormSection label="Image">
                    <div className="grid grid-cols-2 gap-8">
                        <FormInput
                            label="Cover image URL"
                            value={formValues.cover_image_url}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, cover_image_url: value }))}
                        />
                        <FormInput
                            label="Cover image credit"
                            value={formValues.cover_image_credit}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, cover_image_credit: value }))}
                        />
                    </div>
                </FormSection>
                <FormSection label="More">
                    <div className="grid grid-cols-2 gap-8">
                        <FormInput
                            label="Common name"
                            value={formValues.common_name}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, common_name: value }))}
                        />
                    </div>
                </FormSection>
                <div className="flex items-center justify-end gap-4 sticky bottom-8">
                    <Button onClick={onReset} size="lg" type="button" variant="outline">
                        <span className="pt-0.5">Reset</span>
                    </Button>
                    <Button size="lg" variant="success" type="submit">
                        <span className="pt-0.5">Save</span>
                        {isLoading ? <Loader2Icon className="w-4 h-4 animate-spin" /> : null}
                    </Button>
                </div>
            </form>
        </div>
    );
};

const FormSection = ({ label, children }: { children: ReactNode; label: string }) => (
    <div className="grid gap-8">
        <h2 className="body-xlarge font-medium">{label}</h2>
        {children}
    </div>
);

const FormControl = ({ label, children }: { children: ReactNode; label: string }) => (
    <div className="grid gap-1">
        <label className="label text-muted-foreground font-semibold">{label}</label>
        {children}
    </div>
);

const FormInput = ({
    label,
    value,
    onValueChange
}: {
    label: string;
    value: string | null;
    onValueChange: (value: string | null) => void;
}) => (
    <FormControl label={label}>
        <Input
            value={value ?? ''}
            onChange={(e) => onValueChange(e.currentTarget.value.length ? e.currentTarget.value : null)}
        />
    </FormControl>
);
