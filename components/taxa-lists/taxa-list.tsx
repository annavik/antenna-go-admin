'use client';

import { TaxaGallery } from '@/components/taxa/taxa-gallery';
import { TaxaTable } from '@/components/taxa/taxa-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tables } from '@/lib/supabase/database.types';
import { LABELS } from '@/lib/taxa/constants';
import { TaxonDetails } from '@/lib/types';
import Fuse from 'fuse.js';
import { Grid2X2Icon, PlusIcon, TableIcon, TagIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ExportTaxa } from '../taxa/export-taxa';
import { Button, buttonVariants } from '../ui/button';
import { ButtonTooltip } from '../ui/button-tooltip';
import { MonthSelect } from '../ui/month-select';
import { SearchInput } from '../ui/search-input';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { DeleteTaxaList } from './delete-taxa-list';
import { EditTaxaList } from './edit-taxa-list';

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

export const TaxaList = ({
    loggedIn,
    taxa,
    taxaList,
    taxaListTags
}: {
    loggedIn?: boolean;
    taxa: TaxonDetails[];
    taxaList: Tables<'taxa_lists'>;
    taxaListTags: Tables<'tags'>[];
}) => {
    const [viewMode, setViewMode] = useState('gallery');
    const [searchString, setSearchString] = useState('');
    const [tagFilter, setTagFilter] = useState<string>(null);
    const [activePeriodFilter, setActivePeriodFilter] = useState<number>(null);
    const filteredTaxa = useMemo(() => {
        let result = taxa;

        if (tagFilter) {
            result = result.filter((taxon) => taxon.tags.find((tag) => tag.id === tagFilter));
        }

        if (activePeriodFilter) {
            result = result.filter((taxon) => {
                return taxon.active_period_from <= activePeriodFilter && taxon.active_period_to >= activePeriodFilter;
            });
        }

        if (searchString.length) {
            const fuse = new Fuse(result, SEARCH_OPTIONS);
            result = fuse.search(searchString)?.map(({ item }) => item);
        }

        return result;
    }, [searchString, tagFilter, activePeriodFilter, taxa]);

    return (
        <>
            <div className="grid grid-cols-2 gap-8 pb-8 border-b">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <h1 className="heading-small text-primary">{taxaList.name}</h1>
                        {taxaList.description ? <span className="body-base">{taxaList.description}</span> : null}
                    </div>
                    <div className="flex items-center gap-4">
                        {loggedIn ? (
                            <>
                                <Link
                                    className={buttonVariants({ variant: 'success' })}
                                    href={`/taxa-list/${taxaList.id}/add`}
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    <span className="pt-0.5">Add taxon</span>
                                </Link>
                                <Link
                                    className={buttonVariants({ variant: 'outline' })}
                                    href={`/taxa-list/${taxaList.id}/tags`}
                                >
                                    <TagIcon className="w-4 h-4" />
                                    <span className="pt-0.5">{LABELS.tags}</span>
                                </Link>
                                <EditTaxaList taxaList={taxaList} />
                                <DeleteTaxaList taxaListId={taxaList.id} />
                            </>
                        ) : null}
                        {taxa.length ? <ExportTaxa isCompact={loggedIn} taxaListId={taxaList.id} /> : null}
                    </div>
                </div>
                <div className="flex items-end justify-end gap-4">
                    <div className="flex items-center gap-8">
                        <ToggleGroup
                            onValueChange={(value) => {
                                if (value) {
                                    setViewMode(value);
                                }
                            }}
                            type="single"
                            value={viewMode}
                        >
                            {VIEW_MODES.map(({ Icon, tooltip, value }) => (
                                <ButtonTooltip key={value} content={tooltip}>
                                    <ToggleGroupItem isActive={value === viewMode} value={value}>
                                        <Icon className="w-4 h-4" />
                                    </ToggleGroupItem>
                                </ButtonTooltip>
                            ))}
                        </ToggleGroup>
                        <div className="flex items-center gap-4">
                            <SearchInput
                                placeholder="Search taxa..."
                                onValueChange={setSearchString}
                                value={searchString}
                            />
                            <MonthSelect
                                placeholder="Active period"
                                value={activePeriodFilter}
                                onValueChange={setActivePeriodFilter}
                            />
                            {taxaListTags.length ? (
                                <div className="flex items-center gap-2">
                                    <Select value={tagFilter ?? ''} onValueChange={setTagFilter}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={LABELS.tags} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {taxaListTags.map((tag) => (
                                                <SelectItem key={tag.id} value={tag.id}>
                                                    <span className="pt-0.5">{tag.name}</span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {tagFilter ? (
                                        <Button onClick={() => setTagFilter(null)} size="icon" variant="ghost">
                                            <XIcon className="w-4 h-4" />
                                        </Button>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            {viewMode === 'gallery' ? <TaxaGallery taxa={filteredTaxa} /> : null}
            {viewMode === 'table' ? <TaxaTable taxa={filteredTaxa} /> : null}
        </>
    );
};
