import { createClient } from '@/lib/supabase/server';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { getTaxonParents } from '@/lib/taxa/get-taxon-parents';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export default async function Page({ params }) {
    const { taxonId } = await params;
    const supabase = await createClient();
    const { data: taxon } = await supabase.from('taxa').select().eq('id', taxonId).maybeSingle();

    if (!taxon) {
        return null;
    }

    const { label } = getTaxonInfo(taxon);
    const parents = getTaxonParents(taxon);

    return (
        <div className="">
            <div className="flex items-center gap-8 pb-8 mb-8 border-b">
                <div className="w-32 h-32 bg-muted rounded-md overflow-hidden">
                    <img alt={label} className="w-full h-full object-cover" src={taxon.cover_image_url} />
                </div>
                <div className="grid gap-4">
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
                    <div className="grid gap-2">
                        <h1 className="heading-small text-primary">{label ?? 'n/a'}</h1>
                        {taxon.common_name ? (
                            <span className="body-xlarge text-foreground/50">({taxon.common_name})</span>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
