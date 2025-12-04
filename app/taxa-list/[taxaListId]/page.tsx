import { Breadcrumbs } from '@/components/breadcrumbs';
import { TaxaList } from '@/components/taxa-lists/taxa-list';
import { createClient } from '@/lib/supabase/server';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();

    if (!taxaList) {
        return notFound();
    }

    const { data } = await supabase.from('taxa').select('*, tags( * )').eq('taxa_list_id', taxaListId);
    const taxa = data
        .map((taxon) => ({ ...taxon, ...getTaxonInfo(taxon) }))
        .sort((t1, t2) => (t1.name < t2.name ? -1 : t1.name > t2.name ? 1 : 0));

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs items={[{ href: '/', label: 'Taxa lists' }, { label: taxaList.name }]} />
            <TaxaList taxaList={taxaList} taxa={taxa} />
        </div>
    );
}
