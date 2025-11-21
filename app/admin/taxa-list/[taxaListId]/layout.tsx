import { DeleteTaxaList } from '@/components/taxa-lists/delete-taxa-list';
import { EditTaxaList } from '@/components/taxa-lists/edit-taxa-list';
import { Taxa } from '@/components/taxa/taxa';
import { LoadingPanel } from '@/components/ui/loading/loading-panel';
import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function RootLayout({ children, params }) {
    return (
        <Suspense fallback={<LoadingPanel />}>
            <Content params={params} />
            {children}
        </Suspense>
    );
}

const Content = async ({ params }: { params: any }) => {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();
    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId).order('created_at');

    if (!taxaList) {
        return notFound();
    }

    return (
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
            <Taxa taxa={taxa} taxaListId={taxaList.id} />
        </Panel>
    );
};
