import { CreateTaxaList } from '@/components/taxa-lists/create-taxa-list';
import { TaxaListLink } from '@/components/taxa-lists/taxa-list-link';
import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';

export default async function RootLayout({ children }) {
    const supabase = await createClient();
    const { data: taxaLists } = await supabase.from('taxa_lists').select().order('created_at');

    return (
        <div className="flex grow">
            <Panel accessory={<CreateTaxaList />} title="Taxa lists">
                <div className="grid gap-2">
                    {taxaLists?.map((taxaList) => (
                        <TaxaListLink key={taxaList.id} taxaList={taxaList} />
                    ))}
                </div>
            </Panel>
            {children}
        </div>
    );
}
