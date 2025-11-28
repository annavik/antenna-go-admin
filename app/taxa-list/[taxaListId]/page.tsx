import { Breadcrumbs } from '@/components/breadcrumbs';
import { Gallery, GalleryItem } from '@/components/ui/gallery';
import { createClient } from '@/lib/supabase/server';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();

    if (!taxaList) {
        return notFound();
    }

    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId).order('created_at');

    return (
        <div className="grow space-y-8 p-8">
            <Breadcrumbs items={[{ href: '/', label: 'Taxa lists' }, { label: taxaList.name }]} />
            <div className="grid gap-2 pb-8 border-b">
                <h1 className="heading-small text-primary">{taxaList.name}</h1>
                {taxaList.description ? <span className="body-base">{taxaList.description}</span> : null}
            </div>
            <Gallery>
                {taxa.map((taxon) => {
                    const { label } = getTaxonInfo(taxon);

                    return (
                        <GalleryItem
                            key={taxon.id}
                            description={taxon.common_name ? `(${taxon.common_name})` : null}
                            href={`/taxa-list/${taxon.taxa_list_id}/taxon/${taxon.id}`}
                            image={taxon.cover_image_thumbnail_url}
                            title={label}
                        />
                    );
                })}
            </Gallery>
        </div>
    );
}
