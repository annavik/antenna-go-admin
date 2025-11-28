import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
    const supabase = await createClient();
    const { data: taxaLists } = await supabase.from('taxa_lists').select().order('created_at');

    return (
        <div className="grow p-8 bg-muted">
            <div className="grid px-8">
                <div className="py-8 border-b">
                    <h1 className="heading-small text-primary">Taxa lists</h1>
                </div>
                <div className="py-8">
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
            </div>
        </div>
    );
}
