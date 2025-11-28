import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { getTaxonParents } from '@/lib/taxa/get-taxon-parents';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export const TaxonHeader = ({ taxon, withImage }: { taxon: Tables<'taxa'>; withImage?: boolean }) => {
    const { label } = getTaxonInfo(taxon);
    const parents = getTaxonParents(taxon);

    return (
        <div className="flex items-center gap-8">
            {withImage && taxon.cover_image_thumbnail_url ? (
                <img
                    alt={label}
                    className="shrink-0 w-32 h-32 object-cover bg-muted rounded-md border"
                    src={taxon.cover_image_thumbnail_url}
                />
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
