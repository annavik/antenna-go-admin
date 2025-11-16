'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/client';
import { DownloadIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';

const FILE_NAME = 'taxa.csv';

export const ExportTaxa = ({ taxaListId }: { taxaListId: string }) => {
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

    const onExport = async () => {
        try {
            setIsLoading(true);
            const { data: csv, error } = await supabase
                .from('taxa')
                .select()
                .eq('taxa_list_id', taxaListId)
                .order('created_at')
                .csv();

            if (error) {
                throw error;
            }

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = FILE_NAME;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            // TODO: Show message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={onExport} size="icon" variant="ghost">
                    {isLoading ? (
                        <Loader2Icon className="w-4 h-4 animate-spin" />
                    ) : (
                        <DownloadIcon className="w-4 h-4" />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span className="pt-0.5">Export taxa as CSV</span>
            </TooltipContent>
        </Tooltip>
    );
};
