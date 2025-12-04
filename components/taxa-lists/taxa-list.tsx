'use client';

import { TaxaGallery } from '@/components/taxa/taxa-gallery';
import { TaxaTable } from '@/components/taxa/taxa-table';
import { Tables } from '@/lib/supabase/database.types';
import { TaxonDetails } from '@/lib/types';
import { Grid2X2Icon, TableIcon } from 'lucide-react';
import { useState } from 'react';
import { ExportTaxa } from '../taxa/export-taxa';
import { ButtonTooltip } from '../ui/button-tooltip';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const VIEW_MODES = [
    {
        Icon: Grid2X2Icon,
        tooltip: 'Gallery',
        value: 'gallery'
    },
    {
        Icon: TableIcon,
        tooltip: 'Table',
        value: 'table'
    }
];

export const TaxaList = ({ taxa, taxaList }: { taxa: TaxonDetails[]; taxaList: Tables<'taxa_lists'> }) => {
    const [viewMode, setViewMode] = useState('gallery');

    return (
        <>
            <div className="grid grid-cols-2 gap-8 pb-8 border-b">
                <div className="grid gap-2">
                    <h1 className="heading-small text-primary">{taxaList.name}</h1>
                    {taxaList.description ? <span className="body-base">{taxaList.description}</span> : null}
                </div>
                <div className="flex items-end justify-end gap-4">
                    <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                        {VIEW_MODES.map(({ Icon, tooltip, value }) => (
                            <ButtonTooltip key={value} content={tooltip}>
                                <ToggleGroupItem isActive={value === viewMode} value={value}>
                                    <Icon className="w-4 h-4" />
                                </ToggleGroupItem>
                            </ButtonTooltip>
                        ))}
                    </ToggleGroup>
                    {taxa.length ? <ExportTaxa taxaListId={taxaList.id} /> : null}
                </div>
            </div>
            {viewMode === 'gallery' ? <TaxaGallery taxa={taxa} /> : null}
            {viewMode === 'table' ? <TaxaTable taxa={taxa} /> : null}
        </>
    );
};
