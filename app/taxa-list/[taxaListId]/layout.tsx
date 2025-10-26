import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';
import { NewTaxonButton } from './new-taxon-button';
import { TaxonLink } from './taxon-link';

export default async function RootLayout({ children, params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();
    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId).order('id');

    if (!taxaList) {
        return null;
    }

    return (
        <>
            <Panel title={taxaList.name} description={taxaList.comments}>
                <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="body-base font-medium">Taxa</span>
                        <NewTaxonButton taxaListId={taxaList.id} />
                    </div>
                    {taxa.map((taxon) => (
                        <TaxonLink key={taxon.id} taxaListId={taxaList.id} taxon={taxon} />
                    ))}
                </div>
            </Panel>
            {children}
        </>
    );
}
