import { CreateTaxaList } from '@/components/taxa-lists/create-taxa-list';
import { TaxaLists } from '@/components/taxa-lists/taxa-lists';
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
    const { data: taxaLists } = await supabase.from('taxa_lists').select().order('name');

    return (
        <Panel accessory={<CreateTaxaList />} title="Taxa lists">
            <TaxaLists taxaLists={taxaLists} />
        </Panel>
    );
};
