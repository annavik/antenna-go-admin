import { CreateTaxaList } from '@/components/taxa-lists/create-taxa-list';
import { TaxaListLink } from '@/components/taxa-lists/taxa-list-link';
import { LoadingPanel } from '@/components/ui/loading/loading-panel';
import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';
import { Suspense } from 'react';

export default async function RootLayout({ children }) {
    return (
        <div className="grow flex">
            <Suspense fallback={<LoadingPanel />}>
                <Content />
                {children}
            </Suspense>
        </div>
    );
}

const Content = async () => {
    const supabase = await createClient();
    const { data: taxaLists } = await supabase.from('taxa_lists').select().order('created_at');

    return (
        <Panel accessory={<CreateTaxaList />} title="Taxa lists">
            <div className="grid gap-2">
                {taxaLists?.map((taxaList) => (
                    <TaxaListLink key={taxaList.id} taxaList={taxaList} />
                ))}
            </div>
        </Panel>
    );
};
