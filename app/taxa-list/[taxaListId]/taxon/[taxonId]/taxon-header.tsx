import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { getTaxonParents } from '@/lib/taxa/get-taxon-parents';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export const TaxonHeader = ({ taxon }: { taxon: Tables<'taxa'> }) => {
    const { label } = getTaxonInfo(taxon);
    const parents = getTaxonParents(taxon);

    return (
        <div className="flex items-center gap-8 p-8">
            {taxon.cover_image_url ? (
                <div className="w-32 h-32 shrink-0 bg-muted rounded-md border overflow-hidden">
                    <img alt={label} className="w-full h-full object-cover" src={taxon.cover_image_url} />
                </div>
            ) : null}
            <div className="grid gap-4">
                {parents.length ? (
                    <div className="flex items-center gap-2">
                        {parents.map((parent, index) => (
                            <Fragment key={parent.rank}>
                                <span className="body-small">{parent.label}</span>
                                {index < parents.length - 1 ? (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                ) : null}
                            </Fragment>
                        ))}
                    </div>
                ) : null}
                <div className="grid gap-2">
                    <h1 className="heading-small text-primary">{label}</h1>
                    {taxon.common_name ? (
                        <span className="body-xlarge text-foreground/50">({taxon.common_name})</span>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
