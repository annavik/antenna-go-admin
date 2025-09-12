import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';
import { createClient } from '../utils/supabase/server';

export default async function Page() {
    const supabase = await createClient();
    const { data: taxaLists } = await supabase.from('taxa_lists').select();

    return (
        <div className="flex grow">
            <Panel title="Taxa lists">
                <div className="grid gap-2">
                    {taxaLists.map((taxaList) => (
                        <Button key={taxaList.id} className="justify-between" variant="outline">
                            <span className="pt-0.5">{taxaList.name}</span>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    ))}
                </div>
            </Panel>
        </div>
    );
}

const Panel = ({ children, title }: { children: ReactNode; title: string }) => (
    <div className="w-sm p-8 bg-muted border-border border-r">
        <span className="block mb-4 body-xlarge font-medium text-primary">{title}</span>
        {children}
    </div>
);
