import { TaxonForm } from '@/components/taxa/taxon-form';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxonId, taxaListId } = await params;
    const supabase = await createClient();
    const { data } = await supabase.from('taxa').select('*, tags( * )').eq('id', taxonId).maybeSingle();

    if (!data) {
        return notFound();
    }

    const { tags: taxonTags, ...taxon } = data;
    const { data: tags } = await supabase.from('tags').select().eq('taxa_list_id', taxaListId).order('created_at');

    return <TaxonForm taxaListId={taxaListId} taxaListTags={tags} taxon={taxon} taxonTags={taxonTags} />;
}
