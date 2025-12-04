import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { ButtonTooltip } from '../ui/button-tooltip';
import { LoadingIcon } from '../ui/loading/loading-icon';

const FILE_NAME = 'taxa.csv';

export const ExportTaxa = ({ isCompact, taxaListId }: { isCompact?: boolean; taxaListId: string }) => {
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
        <ButtonTooltip content="Export taxa as CSV">
            <Button onClick={onExport} size={isCompact ? 'icon' : 'sm'} variant="ghost">
                {isLoading ? <LoadingIcon /> : <DownloadIcon className="w-4 h-4" />}
                {isCompact ? null : <span>Export</span>}
            </Button>
        </ButtonTooltip>
    );
};
