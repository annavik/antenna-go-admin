import { Breadcrumbs } from '@/components/breadcrumbs';
import { CreateTag } from '@/components/tags/create-tag';
import { TagsTable } from '@/components/tags/tags-table';
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();

    if (!taxaList) {
        return notFound();
    }

    const { data: tags } = await supabase.from('tags').select().eq('taxa_list_id', taxaListId).order('name');

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs
                items={[
                    { href: '/', label: 'Taxa lists' },
                    { label: taxaList.name, href: `/taxa-list/${taxaListId}` },
                    { label: 'Tags' }
                ]}
            />
            <div className="pb-8 border-b">
                <div className="space-y-4">
                    <h1 className="heading-small text-primary">Tags</h1>
                    <CreateTag taxaListId={taxaList.id} />
                </div>
            </div>
            <TagsTable tags={tags} />
        </div>
    );
}
