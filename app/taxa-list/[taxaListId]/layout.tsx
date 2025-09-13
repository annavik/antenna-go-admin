import { buttonVariants } from '@/components/ui/button';
import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default async function RootLayout({ children, params }) {
    const { taxaListId } = await params;
    const supabase = await createClient();
    const { data: taxaList } = await supabase.from('taxa_lists').select().eq('id', taxaListId).maybeSingle();
    const { data: taxa } = await supabase.from('taxa').select().eq('taxa_list_id', taxaListId);

    if (!taxaList) {
        return null;
    }

    return (
        <>
            <Panel title={taxaList.name} description={taxaList.comments}>
                <div className="grid gap-2">
                    {taxa.map((taxon) => {
                        const { label } = getTaxonInfo(taxon);

                        return (
                            <Link
                                className={cn(buttonVariants({ variant: 'outline' }), 'justify-between')}
                                href={`/taxa-list/${taxaList.id}/taxon/${taxon.id}`}
                                key={taxon.id}
                            >
                                <span className="pt-0.5">{label}</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        );
                    })}
                </div>
            </Panel>
            {children}
        </>
    );
}
