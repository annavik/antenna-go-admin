import { FormField } from '@/components/forms/form-field';
import { Tables } from '@/lib/supabase/database.types';
import { LABELS } from '@/lib/taxa/constants';
import { getActivePeriodLabel } from '@/lib/taxa/get-active-period-label';
import { TaxonDetails as _TaxonDetails } from '@/lib/types';
import { PenIcon } from 'lucide-react';
import Link from 'next/link';
import { GBIFLink } from '../external-resources/gbif-link';
import { INatLink } from '../external-resources/inat-link';
import { ApplyTags } from '../tags/apply-tags';
import { Tag } from '../tags/tag';
import { buttonVariants } from '../ui/button';
import { DeleteTaxon } from './delete-taxon';
import { TaxonHeader } from './taxon-header';

export const TaxonDetails = ({
    loggedIn,
    taxaListTags,
    taxon
}: {
    loggedIn?: boolean;
    taxaListTags: Tables<'tags'>[];
    taxon: _TaxonDetails;
}) => (
    <div className="max-w-screen-xl grid px-8 bg-background rounded-lg border">
        <div className="grid gap-2 py-8 border-b relative">
            <TaxonHeader taxon={taxon} />
            {loggedIn ? (
                <div className="absolute top-8 right-0 flex items-center gap-4">
                    <DeleteTaxon taxaListId={taxon.taxa_list_id} taxonId={taxon.id} />
                    <Link
                        className={buttonVariants({ variant: 'outline' })}
                        href={`/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}/edit`}
                    >
                        <PenIcon className="w-4 h-4" />
                        <span className="pt-0.5">Edit taxon</span>
                    </Link>
                </div>
            ) : null}
        </div>
        <div className="grid grid-cols-2 items-start gap-8 py-8">
            <div className="grid grid-cols-2 items-start gap-8">
                <div className="grid gap-4">
                    <h2 className="body-xlarge font-medium">Taxonomy</h2>
                    <Field label={LABELS.phylum} value={taxon.phylum} />
                    <Field label={LABELS.class} value={taxon.class} />
                    <Field label={LABELS.order} value={taxon.order} />
                    <Field label={LABELS.superfamily} value={taxon.superfamily} />
                    <Field label={LABELS.family} value={taxon.family} />
                    <Field label={LABELS.subfamily} value={taxon.subfamily} />
                    <Field label={LABELS.tribe} value={taxon.tribe} />
                    <Field label={LABELS.genus} value={taxon.genus} />
                    <Field label={LABELS.species} value={taxon.species} />
                </div>
                <div className="grid gap-8">
                    <div className="grid gap-4">
                        <h2 className="body-xlarge font-medium">External resources</h2>
                        <div className="flex items-center gap-4">
                            {taxon.inat_taxon_id ? (
                                <INatLink label="iNaturalist" taxonId={taxon.inat_taxon_id} />
                            ) : null}
                            {taxon.gbif_taxon_key ? <GBIFLink label="GBIF" taxonKey={taxon.gbif_taxon_key} /> : null}
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <h2 className="body-xlarge font-medium">Active period</h2>
                        <span className="body-base text-muted-foreground">{getActivePeriodLabel(taxon)}</span>
                    </div>
                    <div className="grid gap-4">
                        <h2 className="body-xlarge font-medium">More</h2>
                        <Field label={LABELS.common_name} value={taxon.common_name} />
                        <FormField
                            accessory={
                                loggedIn ? (
                                    <ApplyTags
                                        taxaListId={taxon.taxa_list_id}
                                        taxaListTags={taxaListTags}
                                        taxonId={taxon.id}
                                        taxonTags={taxon.tags}
                                    />
                                ) : null
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
                        <Field label={LABELS.notes} value={taxon.notes} />
                    </div>
                </div>
            </div>
            {taxon.cover_image_url ? (
                <div className="grid gap-1">
                    <a
                        className="hover:opacity-70"
                        href={taxon.cover_image_url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img alt="" className="bg-muted rounded-md border" src={taxon.cover_image_url} />
                    </a>
                    {taxon.cover_image_credit ? (
                        <span className="body-base text-muted-foreground italic">{taxon.cover_image_credit}</span>
                    ) : null}
                </div>
            ) : null}
        </div>
    </div>
);

const Field = ({ label, value }: { label: string; value: string | null }) => {
    if (!value) {
        return null;
    }

    return (
        <FormField label={label}>
            <span className="body-base text-muted-foreground">{value}</span>
        </FormField>
    );
};
