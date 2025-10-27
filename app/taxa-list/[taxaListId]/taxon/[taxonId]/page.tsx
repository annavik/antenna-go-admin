import { EditTaxon } from '@/components/taxa/edit-taxon';
import { createClient } from '@/lib/supabase/server';

export default async function Page({ params }) {
    const { taxonId, taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxon } = await supabase.from('taxa').select().eq('id', taxonId).maybeSingle();

    if (!taxon) {
        return null;
    }

    return <EditTaxon taxaListId={taxaListId} taxon={taxon} />;
}
