import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { SearchInput } from '@/components/ui/search-input';
import { useDebounce } from '@/hooks/useDebounce';
import { useGBIFSearch } from '@/hooks/useGBIFSearch';
import { Tables } from '@/lib/supabase/database.types';
import { convertGBIFTaxon } from '@/lib/taxa/convert-gbif-taxon';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { GBIFTaxon } from '@/lib/types';
import { ExternalLinkIcon, SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmForm } from './confirm-form';
import { SearchResult } from './search-result';

const getGBIFUrl = (taxonKey: string) => `https://www.gbif.org/species/${taxonKey}`;

export const GBIFControl = ({
    onTaxonChange,
    taxon
}: {
    onTaxonChange: (taxon: Tables<'taxa'>) => void;
    taxon: Tables<'taxa'>;
}) => (
    <div className="flex items-center gap-2">
        {!taxon.gbif_taxon_key ? (
            <GBIFDialog onConfirm={(fields) => onTaxonChange({ ...taxon, ...fields })} taxon={taxon} />
        ) : (
            <div className="flex items-center gap-2">
                <a
                    className={buttonVariants({ variant: 'outline' })}
                    href={getGBIFUrl(taxon.gbif_taxon_key)}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="pt-0.5">{taxon.gbif_taxon_key}</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                </a>
                <Button onClick={() => onTaxonChange({ ...taxon, gbif_taxon_key: null })} size="icon" variant="ghost">
                    <XIcon className="w-4 h-4" />
                </Button>
            </div>
        )}
    </div>
);

const GBIFDialog = ({
    onConfirm,
    taxon: _taxon
}: {
    onConfirm: (fields: { [key: string]: string }) => void;
    taxon: Tables<'taxa'>;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [taxon, setTaxon] = useState<GBIFTaxon>(null);

    useEffect(() => {
        setSearchString(getTaxonInfo(_taxon)?.name ?? '');
        setTaxon(null);
    }, [isOpen, _taxon]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <SearchIcon className="w-4 h-4" />
                    <span className="pt-0.5">Search GBIF</span>
                </Button>
            </DialogTrigger>
            {!taxon ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search GBIF</DialogTitle>
                        <DialogDescription>You can search both scientific names and common names.</DialogDescription>
                    </DialogHeader>
                    <GBIFSearch
                        searchString={searchString}
                        onConfirm={setTaxon}
                        onSearchStringChange={setSearchString}
                    />
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm import</DialogTitle>
                        <DialogDescription>You can import all or some fields.</DialogDescription>
                    </DialogHeader>
                    <GBIFConfirm
                        onBack={() => setTaxon(null)}
                        onConfirm={(fields) => {
                            onConfirm(fields);
                            setIsOpen(false);
                        }}
                        taxon={taxon}
                    />
                </DialogContent>
            )}
        </Dialog>
    );
};

const GBIFSearch = ({
    onSearchStringChange,
    onConfirm,
    searchString
}: {
    onSearchStringChange: (searchString: string) => void;
    onConfirm: (taxon: GBIFTaxon) => void;
    searchString: string;
}) => {
    const debouncedSetSearchString = useDebounce(searchString, 200);
    const { data, isLoading } = useGBIFSearch(debouncedSetSearchString);

    return (
        <>
            <SearchInput isLoading={isLoading} onValueChange={onSearchStringChange} value={searchString} />
            {searchString.length && data?.results.length ? (
                <div className="border rounded-md overflow-hidden">
                    {data.results.slice(0, 5).map((result) => (
                        <div
                            key={result.key}
                            className="not-last:border-b cursor-pointer hover:bg-muted"
                            onClick={() => onConfirm(result)}
                        >
                            <SearchResult label={result.canonicalName} rank={result.rank.toLowerCase()} />
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

const GBIFConfirm = ({
    onBack,
    onConfirm,
    taxon
}: {
    onBack: () => void;
    onConfirm: (fields: { [key: string]: string }) => void;
    taxon: GBIFTaxon;
}) => {
    const fields = useMemo(() => convertGBIFTaxon(taxon), [taxon]);

    return <ConfirmForm fields={fields} onBack={onBack} onConfirm={onConfirm} />;
};
