import { DeleteTaxaList } from '@/components/taxa-lists/delete-taxa-list';
import { EditTaxaList } from '@/components/taxa-lists/edit-taxa-list';
import { AddTaxon } from '@/components/taxa/add-taxon';
import { ExportTaxa } from '@/components/taxa/export-taxa';
import { TaxonLink } from '@/components/taxa/taxon-link';
import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';

export default async function RootLayout({ children, params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();
    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId).order('created_at');

    if (!taxaList) {
        return null;
    }

    return (
        <>
            <Panel
                accessory={
                    <div className="flex items-center gap-2">
                        <DeleteTaxaList taxaListId={taxaList.id} />
                        <EditTaxaList taxaList={taxaList} />
                    </div>
                }
                title={taxaList.name}
                description={taxaList.description}
            >
                <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="body-base font-medium">Taxa</span>
                        <div className="flex items-center justify-center gap-2">
                            <ExportTaxa taxaListId={taxaList.id} />
                            <AddTaxon taxaListId={taxaList.id} />
                        </div>
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
