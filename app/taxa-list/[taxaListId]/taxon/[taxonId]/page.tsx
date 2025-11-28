import { TaxonDetails } from '@/components/taxa/taxon-details';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxonId } = await params;
    const supabase = await createClient();
    const { data } = await supabase.from('taxa').select('*, tags( * )').eq('id', taxonId).maybeSingle();

    if (!data) {
        return notFound();
    }

    const { tags: taxonTags, ...taxon } = data;

    return (
        <div className="grow p-8 bg-muted">
            <TaxonDetails taxon={taxon} taxonTags={taxonTags} />
        </div>
    );
}
