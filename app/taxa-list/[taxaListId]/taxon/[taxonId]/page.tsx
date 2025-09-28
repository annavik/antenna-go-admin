import { createClient } from '@/lib/supabase/server';
import { TaxonForm } from './taxon-form';

export default async function Page({ params }) {
    const { taxonId, taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxon } = await supabase.from('taxa').select().eq('id', taxonId).maybeSingle();

    if (!taxon) {
        return null;
    }

    return <TaxonForm taxaListId={taxaListId} taxon={taxon} />;
}
