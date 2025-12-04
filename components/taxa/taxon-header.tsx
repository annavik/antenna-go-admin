import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { getTaxonParents } from '@/lib/taxa/get-taxon-parents';
import { ChevronRightIcon, EllipsisIcon } from 'lucide-react';
import { Fragment } from 'react';

export const TaxonHeader = ({
    taxon,
    withImage,
    withParents
}: {
    taxon: Tables<'taxa'>;
    withImage?: boolean;
    withParents?: boolean;
}) => {
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
                {withParents && parents.length ? (
                    <div className="flex items-center flex-wrap gap-2">
                        <Parents parents={parents} />
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

const Parents = ({ parents }: { parents: { label: string; rank: string }[] }) => {
    if (parents.length <= 3) {
        return (
            <>
                {parents.map((parent, index) => (
                    <Fragment key={parent.rank}>
                        <ParentLabel>{parent.label}</ParentLabel>
                        {index < parents.length - 1 ? <ChevronRight /> : null}
                    </Fragment>
                ))}
            </>
        );
    }

    const firstParents = parents.slice(0, 1);
    const lastParents = parents.slice(-2);

    return (
        <>
            {firstParents.map((parent, index) => (
                <Fragment key={parent.rank}>
                    <ParentLabel>{parent.label}</ParentLabel>
                    {index < firstParents.length - 1 ? <ChevronRight /> : null}
                </Fragment>
            ))}
            <ChevronRight />
            <Ellipsis />
            <ChevronRight />
            {lastParents.map((parent, index) => (
                <Fragment key={parent.rank}>
                    <ParentLabel>{parent.label}</ParentLabel>
                    {index < lastParents.length - 1 ? <ChevronRight /> : null}
                </Fragment>
            ))}
        </>
    );
};

const ParentLabel = ({ children }: { children: string }) => <span className="body-small pt-0.5">{children}</span>;

const ChevronRight = () => <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />;

const Ellipsis = () => <EllipsisIcon className="w-4 h-4 text-muted-foreground" />;
