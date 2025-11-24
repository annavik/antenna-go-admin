'use client';

import { Tables } from '@/lib/supabase/database.types';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { SearchInput } from '../ui/search-input';
import { AddTaxon } from './add-taxon';
import { ExportTaxa } from './export-taxa';
import { TaxonLink } from './taxon-link';

const SEARCH_OPTIONS = {
    keys: ['label', 'common_name'],
    threshold: 0.4
};

export const Taxa = ({ taxa, taxaListId }: { taxa: Tables<'taxa'>[]; taxaListId: string }) => {
    const [searchString, setSearchString] = useState('');
    const fuse = useMemo(() => {
        const list = taxa.map((taxon) => {
            const { label } = getTaxonInfo(taxon);

            return { ...taxon, label };
        });

        return new Fuse(list, SEARCH_OPTIONS);
    }, [taxa]);

    const filteredTaxa = searchString.length ? fuse.search(searchString)?.map(({ item }) => item) : taxa;

    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between gap-2">
                <span className="body-base font-medium">Taxa</span>
                <div className="flex items-center justify-center gap-2">
                    {taxa.length ? <ExportTaxa taxaListId={taxaListId} /> : null}
                    <AddTaxon taxaListId={taxaListId} />
                </div>
            </div>
            {taxa.length ? (
                <>
                    <SearchInput placeholder="Search taxa..." onValueChange={setSearchString} value={searchString} />
                    {filteredTaxa.length ? (
                        filteredTaxa.map((taxon) => <TaxonLink key={taxon.id} taxon={taxon} />)
                    ) : (
                        <span className="body-base text-muted-foreground">No matches found</span>
                    )}
                </>
            ) : (
                <span className="body-base text-muted-foreground">Nothing to show here yet</span>
            )}
        </div>
    );
};
