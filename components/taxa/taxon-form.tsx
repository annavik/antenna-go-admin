'use client';

import { FormField } from '@/components/forms/form-field';
import { FormInput } from '@/components/forms/form-input';
import { FormSection } from '@/components/forms/form-section';
import { Button, buttonVariants } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { Tables } from '@/lib/supabase/database.types';
import { LABELS } from '@/lib/taxa/constants';
import { TaxonDetails } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GBIFControl } from '../external-resources/gbif-control';
import { INatControl } from '../external-resources/inat-control';
import { FormImage } from '../forms/form-image';
import { FormTextarea } from '../forms/form-textarea';
import { EditTaxonTags } from '../tags/edit-taxon-tags';
import { Tag } from '../tags/tag';
import { LoadingIcon } from '../ui/loading/loading-icon';
import { MonthSelect } from '../ui/month-select';
import { DeleteTaxon } from './delete-taxon';
import { TaxonHeader } from './taxon-header';

export const TaxonForm = ({
    taxaListId,
    taxaListTags,
    taxon
}: {
    taxaListId: string;
    taxaListTags: Tables<'tags'>[];
    taxon: TaxonDetails;
}) => {
    const supabase = createClient();
    const router = useRouter();
    const { tags, label, rank, name, ...defaultFormValues } = taxon;
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [isLoading, setIsLoading] = useState(false);

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
            <div className="p-8 relative">
                <TaxonHeader taxon={formValues} withImage withParents />
                <Link
                    className={cn(buttonVariants({ variant: 'outline' }), 'absolute top-8 right-8')}
                    href={`/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}`}
                >
                    <span className="pt-0.5">View</span>
                </Link>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
                className="grid gap-16 p-8"
            >
                <FormSection label="External resources">
                    <div className="grid grid-cols-2 gap-8">
                        <FormField label={LABELS.inat_taxon_id}>
                            <INatControl
                                taxon={formValues}
                                onTaxonChange={(taxon) => setFormValues((prev) => ({ ...prev, ...taxon }))}
                            />
                        </FormField>
                        <FormField label={LABELS.gbif_taxon_key}>
                            <GBIFControl
                                taxon={formValues}
                                onTaxonChange={(taxon) => setFormValues((prev) => ({ ...prev, ...taxon }))}
                            />
                        </FormField>
                    </div>
                </FormSection>
                <FormSection label="Taxonomy">
                    <div className="grid grid-cols-2 gap-8">
                        <FormInput
                            label={LABELS.phylum}
                            value={formValues.phylum}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, phylum: value }))}
                        />
                        <FormInput
                            label={LABELS.class}
                            value={formValues.class}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, class: value }))}
                        />
                        <FormInput
                            label={LABELS.order}
                            value={formValues.order}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, order: value }))}
                        />
                        <FormInput
                            label={LABELS.superfamily}
                            value={formValues.superfamily}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, superfamily: value }))}
                        />
                        <FormInput
                            label={LABELS.family}
                            value={formValues.family}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, family: value }))}
                        />
                        <FormInput
                            label={LABELS.subfamily}
                            value={formValues.subfamily}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, subfamily: value }))}
                        />
                        <FormInput
                            label={LABELS.tribe}
                            value={formValues.tribe}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, tribe: value }))}
                        />
                        <FormInput
                            label={LABELS.genus}
                            value={formValues.genus}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, genus: value }))}
                        />
                        <FormInput
                            label={LABELS.species}
                            value={formValues.species}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, species: value }))}
                        />
                    </div>
                </FormSection>
                <FormSection label="Image">
                    <div className="grid grid-cols-2 gap-8 items-start">
                        <FormImage
                            label={LABELS.cover_image_url}
                            value={formValues.cover_image_url}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, cover_image_url: value }))}
                        />
                        <FormImage
                            imageClassName="w-32 h-32 object-cover"
                            label={LABELS.cover_image_thumbnail_url}
                            value={formValues.cover_image_thumbnail_url}
                            onValueChange={(value) =>
                                setFormValues((prev) => ({ ...prev, cover_image_thumbnail_url: value }))
                            }
                        />
                        <FormInput
                            label={LABELS.cover_image_credit}
                            value={formValues.cover_image_credit}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, cover_image_credit: value }))}
                        />
                    </div>
                </FormSection>
                <FormSection label="Active period">
                    <div className="grid grid-cols-2 gap-8 items-start">
                        <div className="grid grid-cols-2 gap-8 items-center">
                            <FormField label={LABELS.active_period_from}>
                                <MonthSelect
                                    value={formValues.active_period_from}
                                    onValueChange={(value) =>
                                        setFormValues((prev) => ({ ...prev, active_period_from: value }))
                                    }
                                />
                            </FormField>
                            <FormField label={LABELS.active_period_to}>
                                <MonthSelect
                                    value={formValues.active_period_to}
                                    onValueChange={(value) =>
                                        setFormValues((prev) => ({ ...prev, active_period_to: value }))
                                    }
                                />
                            </FormField>
                        </div>
                    </div>
                </FormSection>
                <FormSection label="More">
                    <div className="grid grid-cols-2 gap-8 items-start">
                        <FormInput
                            label={LABELS.common_name}
                            value={formValues.common_name}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, common_name: value }))}
                        />
                        <FormField
                            accessory={
                                <EditTaxonTags taxaListTags={taxaListTags} taxonId={taxon.id} taxonTags={taxon.tags} />
                            }
                            label={LABELS.tags}
                        >
                            {taxon.tags.length ? (
                                <div className="flex flex-wrap gap-2">
                                    {taxon.tags.map((tag) => (
                                        <Tag key={tag.id} isActive tag={tag} />
                                    ))}
                                </div>
                            ) : (
                                <span className="body-base text-muted-foreground">Not set</span>
                            )}
                        </FormField>
                        <FormTextarea
                            label={LABELS.notes}
                            value={formValues.notes}
                            onValueChange={(value) => setFormValues((prev) => ({ ...prev, notes: value }))}
                        />
                    </div>
                </FormSection>
                <div className="flex items-center justify-end gap-4 sticky bottom-8">
                    <DeleteTaxon taxaListId={taxaListId} taxonId={taxon.id} />
                    <Button variant="success" type="submit">
                        <span className="pt-0.5">Save</span>
                        {isLoading ? <LoadingIcon /> : null}
                    </Button>
                </div>
            </form>
        </div>
    );
};
