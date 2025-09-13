import { createClient } from '@/lib/supabase/server';
import { TaxonForm } from './taxon-form';
import { TaxonHeader } from './taxon-header';

export default async function Page({ params }) {
    const { taxonId } = await params;
    const supabase = await createClient();
    const { data: taxon } = await supabase.from('taxa').select().eq('id', taxonId).maybeSingle();

    if (!taxon) {
        return null;
    }

    return (
        <div>
            <TaxonHeader taxon={taxon} />
            <TaxonForm taxon={taxon} />
        </div>
    );
}
