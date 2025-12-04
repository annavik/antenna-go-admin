'use client';

import { TaxaGallery } from '@/components/taxa/taxa-gallery';
import { TaxaTable } from '@/components/taxa/taxa-table';
import { Tables } from '@/lib/supabase/database.types';
import { TaxonDetails } from '@/lib/types';
import Fuse from 'fuse.js';
import { Grid2X2Icon, TableIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ExportTaxa } from '../taxa/export-taxa';
import { ButtonTooltip } from '../ui/button-tooltip';
import { SearchInput } from '../ui/search-input';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const SEARCH_OPTIONS = {
    keys: ['label', 'common_name'],
    threshold: 0.4
};

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
    const [searchString, setSearchString] = useState('');
    const fuse = useMemo(() => new Fuse(taxa, SEARCH_OPTIONS), [taxa]);
    const filteredTaxa = searchString.length ? fuse.search(searchString)?.map(({ item }) => item) : taxa;

    return (
        <>
            <div className="grid grid-cols-2 gap-8 pb-8 border-b">
                <div className="grid gap-2">
                    <h1 className="heading-small text-primary">{taxaList.name}</h1>
                    {taxaList.description ? <span className="body-base">{taxaList.description}</span> : null}
                </div>
                <div className="flex items-end justify-end gap-4">
                    <div className="flex items-center gap-4">
                        <ToggleGroup type="single" value={viewMode} onValueChange={setViewMode}>
                            {VIEW_MODES.map(({ Icon, tooltip, value }) => (
                                <ButtonTooltip key={value} content={tooltip}>
                                    <ToggleGroupItem isActive={value === viewMode} value={value}>
                                        <Icon className="w-4 h-4" />
                                    </ToggleGroupItem>
                                </ButtonTooltip>
                            ))}
                        </ToggleGroup>
                        <SearchInput
                            placeholder="Search taxa..."
                            onValueChange={setSearchString}
                            value={searchString}
                        />
                        {taxa.length ? <ExportTaxa taxaListId={taxaList.id} /> : null}
                    </div>
                </div>
            </div>
            {viewMode === 'gallery' ? <TaxaGallery taxa={filteredTaxa} /> : null}
            {viewMode === 'table' ? <TaxaTable taxa={filteredTaxa} /> : null}
        </>
    );
};
