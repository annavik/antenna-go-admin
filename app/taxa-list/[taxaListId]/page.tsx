import { Breadcrumbs } from '@/components/breadcrumbs';
import { TaxaList } from '@/components/taxa-lists/taxa-list';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();

    if (!taxaList) {
        return notFound();
    }

    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId).order('created_at');

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs items={[{ href: '/', label: 'Taxa lists' }, { label: taxaList.name }]} />
            <TaxaList taxaList={taxaList} taxa={taxa} />
        </div>
    );
}
