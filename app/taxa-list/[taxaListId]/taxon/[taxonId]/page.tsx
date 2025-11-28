import { GBIFLink } from '@/components/external-resources/gbif-link';
import { INatLink } from '@/components/external-resources/inat-link';
import { FormControl } from '@/components/forms/form-control';
import { Tag } from '@/components/tags/tag';
import { TaxonHeader } from '@/components/taxa/taxon-header';
import { createClient } from '@/lib/supabase/server';
import { LABELS } from '@/lib/taxa/constants';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxonId } = await params;
    const supabase = await createClient();
    const { data } = await supabase.from('taxa').select('*, tags( * )').eq('id', taxonId).maybeSingle();

    if (!data) {
        return notFound();
    }

    const { tags: taxonTags, ...taxon } = data;
    const { label } = getTaxonInfo(taxon);

    return (
        <div className="grow p-8 bg-muted">
            <div className="grid px-8 bg-background rounded-lg border">
                <div className="grid gap-2 py-8 border-b relative">
                    <TaxonHeader taxon={taxon} />
                </div>
                <div className="grid grid-cols-2 items-start gap-8 py-8">
                    <div className="grid grid-cols-2 items-start gap-8">
                        <div className="grid gap-8">
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
                            <div className="grid gap-4">
                                <h2 className="body-xlarge font-medium">External resources</h2>
                                <div className="flex items-center gap-4">
                                    {taxon.inat_taxon_id ? (
                                        <INatLink label="iNaturalist" taxonId={taxon.inat_taxon_id} />
                                    ) : null}
                                    {taxon.gbif_taxon_key ? (
                                        <GBIFLink label="GBIF" taxonKey={taxon.gbif_taxon_key} />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <h2 className="body-xlarge font-medium">More</h2>
                            <Field label={LABELS.common_name} value={taxon.common_name} />
                            {taxonTags.length ? (
                                <FormControl label={LABELS.tags}>
                                    <div className="flex items-center gap-2">
                                        {taxonTags.map((tag) => (
                                            <Tag key={tag.id} isActive tag={tag} />
                                        ))}
                                    </div>
                                </FormControl>
                            ) : null}
                            <Field label={LABELS.notes} value={taxon.notes} />
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
                                <span className="body-base text-muted-foreground italic">
                                    {taxon.cover_image_credit}
                                </span>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

const Field = ({ label, value }: { label: string; value: string | null }) => {
    if (!value) {
        return null;
    }

    return (
        <FormControl label={label}>
            <span className="body-base text-muted-foreground">{value}</span>
        </FormControl>
    );
};
