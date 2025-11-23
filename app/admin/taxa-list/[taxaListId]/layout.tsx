import { Tags } from '@/components/tags/tags';
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

    if (!taxaList) {
        return notFound();
    }

    const { data: tags } = await supabase.from('tags').select().eq('taxa_list_id', taxaListId).order('created_at');
    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId).order('created_at');

    return (
        <Panel
            accessory={
                <div className="flex items-center gap-2">
                    <DeleteTaxaList taxaListId={taxaList.id} />
                    <EditTaxaList taxaList={taxaList} />
                </div>
            }
            description={taxaList.description}
            title={taxaList.name}
        >
            <div className="grid gap-8">
                <Tags tags={tags} taxaListId={taxaList.id} />
                <Taxa taxa={taxa} taxaListId={taxaList.id} />
            </div>
        </Panel>
    );
};
