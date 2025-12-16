import { Breadcrumbs } from '@/components/breadcrumbs';
import { EditTaxon } from '@/components/taxa/edit-taxon';
import { createClient } from '@/lib/supabase/server';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }) {
    const { taxonId, taxaListId } = await params;
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

    const { data: taxon } = await supabase.from('taxa').select().eq('id', taxonId).maybeSingle();

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs
                items={[
                    { label: taxaList.name, href: `/taxa-list/${taxaList.id}` },
                    { label: getTaxonInfo(taxon).label, href: `/taxa-list/${taxaList.id}/taxon/${taxon.id}` },
                    { label: 'Edit taxon' }
                ]}
            />
            <EditTaxon taxon={taxon} />;
        </div>
    );
}
