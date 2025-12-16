import { Breadcrumbs } from '@/components/breadcrumbs';
import { AddTaxon } from '@/components/taxa/add-taxon';
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();

    if (!taxaList) {
        return notFound();
    }

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs
                items={[{ label: taxaList.name, href: `/taxa-list/${taxaList.id}` }, { label: 'Add taxon' }]}
            />
            <AddTaxon taxaListId={taxaList.id} />
        </div>
    );
}
