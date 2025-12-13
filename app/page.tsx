import { CreateTaxaList } from '@/components/taxa-lists/create-taxa-list';
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();
    const { data: taxaLists } = await supabase.from('taxa_lists').select().order('name');

    return (
        <div className="grow space-y-8 p-8">
            <div className="pb-8 border-b">
                <div className="space-y-4">
                    <h1 className="heading-small text-primary">Taxa lists</h1>
                    {user ? <CreateTaxaList /> : null}
                </div>
            </div>
            <Gallery size="lg">
                {taxaLists?.map((taxaList) => (
                    <GalleryItem
                        key={taxaList.id}
                        description={taxaList.description}
                        href={`/taxa-list/${taxaList.id}`}
                        title={taxaList.name}
                    />
                ))}
            </Gallery>
        </div>
    );
}
