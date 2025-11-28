import { Breadcrumbs } from '@/components/breadcrumbs';
import { TaxonDetails } from '@/components/taxa/taxon-details';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxaListId, taxonId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();
    const { data } = await supabase.from('taxa').select('*, tags( * )').eq('id', taxonId).maybeSingle();

    if (!data) {
        return notFound();
    }

    const { tags: taxonTags, ...taxon } = data;

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs
                items={[
                    { href: '/', label: 'Taxa lists' },
                    { label: taxaList.name, href: `/taxa-list/${taxaListId}` },
                    { label: 'Taxon' }
                ]}
            />
            <TaxonDetails taxon={taxon} taxonTags={taxonTags} />
        </div>
    );
}
