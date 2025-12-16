import { Button } from '@/components/ui/button';
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
import { useINatSearch } from '@/hooks/useINatSearch';
import { useINatTaxon } from '@/hooks/useINatTaxon';
import { Tables } from '@/lib/supabase/database.types';
import { convertINatTaxon } from '@/lib/taxa/convert-inat-taxon';
import { getTaxonInfo } from '@/lib/taxa/get-taxon-info';
import { SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ConfirmForm } from './confirm-form';
import { INatLink } from './inat-link';
import { SearchResult } from './search-result';

export const INatControl = ({
    onTaxonChange,
    taxon
}: {
    onTaxonChange: (taxon: Partial<Tables<'taxa'>>) => void;
    taxon: Partial<Tables<'taxa'>>;
}) => (
    <div className="flex items-center gap-2">
        {!taxon.inat_taxon_id ? (
            <INatDialog taxon={taxon} onConfirm={(fields) => onTaxonChange({ ...taxon, ...fields })} />
        ) : (
            <div className="flex items-center gap-2">
                <INatLink taxonId={taxon.inat_taxon_id} />
                <Button onClick={() => onTaxonChange({ ...taxon, inat_taxon_id: null })} size="icon" variant="ghost">
                    <XIcon className="w-4 h-4" />
                </Button>
            </div>
        )}
    </div>
);

const INatDialog = ({
    onConfirm,
    taxon
}: {
    onConfirm: (fields: { [key: string]: string }) => void;
    taxon: Partial<Tables<'taxa'>>;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchString, setSearchString] = useState(getTaxonInfo(taxon)?.name ?? '');
    const [taxonId, setTaxonId] = useState<number>(null);

    useEffect(() => {
        setSearchString(getTaxonInfo(taxon)?.name ?? '');
        setTaxonId(null);
    }, [isOpen, taxon]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <SearchIcon className="w-4 h-4" />
                    <span className="pt-0.5">Search iNaturalist</span>
                </Button>
            </DialogTrigger>
            {!taxonId ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search iNaturalist</DialogTitle>
                        <DialogDescription>You can search both scientific names and common names.</DialogDescription>
                    </DialogHeader>
                    <INatSearch
                        searchString={searchString}
                        onConfirm={setTaxonId}
                        onSearchStringChange={setSearchString}
                    />
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm import</DialogTitle>
                        <DialogDescription>You can import all or some fields.</DialogDescription>
                    </DialogHeader>
                    <INatConfirm
                        onBack={() => setTaxonId(null)}
                        onConfirm={(fields) => {
                            onConfirm(fields);
                            setIsOpen(false);
                        }}
                        taxonId={taxonId}
                    />
                </DialogContent>
            )}
        </Dialog>
    );
};

const INatSearch = ({
    onSearchStringChange,
    onConfirm,
    searchString
}: {
    onSearchStringChange: (searchString: string) => void;
    onConfirm: (taxonId: number) => void;
    searchString: string;
}) => {
    const debouncedSetSearchString = useDebounce(searchString, 200);
    const { data, isLoading } = useINatSearch(debouncedSetSearchString);

    return (
        <>
            <SearchInput isLoading={isLoading} onValueChange={onSearchStringChange} value={searchString} />
            {searchString.length && data?.results.length ? (
                <div className="border rounded-md overflow-hidden">
                    {data.results.slice(0, 5).map((result) => (
                        <div
                            key={result.id}
                            className="not-last:border-b cursor-pointer hover:bg-muted"
                            onClick={() => onConfirm(result.id)}
                        >
                            <SearchResult
                                commonName={result.preferred_common_name}
                                label={result.name}
                                rank={result.rank}
                                thumbnailUrl={result.default_photo?.square_url}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

const INatConfirm = ({
    onBack,
    onConfirm,
    taxonId
}: {
    onBack: () => void;
    onConfirm: (fields: { [key: string]: string }) => void;
    taxonId: number;
}) => {
    const { data, isLoading } = useINatTaxon(taxonId);
    const fields = useMemo(() => (data?.results?.length ? convertINatTaxon(data.results[0]) : undefined), [data]);

    return <ConfirmForm fields={fields} onBack={onBack} onConfirm={onConfirm} isLoading={isLoading} />;
};
