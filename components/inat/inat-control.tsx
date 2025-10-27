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
import { useINatSearch } from '@/hooks/useINatSearch';
import { useINatTaxon } from '@/hooks/useINatTaxon';
import { Tables } from '@/lib/supabase/database.types';
import { convertINatTaxon } from '@/lib/taxa/convert-inat-taxon';
import { INatTaxonDetails } from '@/lib/types';
import { ExternalLinkIcon, Loader2Icon, SearchIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

export const INatControl = ({
    taxon,
    onTaxonChange
}: {
    taxon: Tables<'taxa'>;
    onTaxonChange: (taxon: Tables<'taxa'>) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (taxon.inat_taxon_id) {
        return (
            <div className="flex items-center gap-4">
                <a
                    className={buttonVariants({ size: 'lg', variant: 'outline' })}
                    href={`https://www.inaturalist.org/taxa/${taxon.inat_taxon_id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="pt-0.5">{taxon.inat_taxon_id}</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                </a>
                <Button
                    onClick={() => onTaxonChange({ ...taxon, inat_taxon_id: null })}
                    size="icon"
                    type="button"
                    variant="ghost"
                >
                    <XIcon className="w-4 h-4" />
                </Button>
            </div>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">
                    <SearchIcon className="w-4 h-4" />
                    <span className="pt-0.5">Search taxa</span>
                </Button>
            </DialogTrigger>
            <INatForm
                onConfirm={(iNatTaxon) => {
                    onTaxonChange({ ...taxon, ...convertINatTaxon(iNatTaxon) });
                    setIsOpen(false);
                }}
            />
        </Dialog>
    );
};

const INatForm = ({ onConfirm }: { onConfirm: (taxon: INatTaxonDetails) => void }) => {
    const [searchString, setSearchString] = useState('');
    const [taxonId, setTaxonId] = useState<number>(null);

    if (!taxonId) {
        return (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search iNaturalist</DialogTitle>
                    <DialogDescription>You can search both scientific names and common names.</DialogDescription>
                </DialogHeader>
                <INatSearch
                    searchString={searchString}
                    onSearchStringChange={setSearchString}
                    onTaxonIdChange={setTaxonId}
                />
            </DialogContent>
        );
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Confirm iNaturalist taxon</DialogTitle>
                <DialogDescription>Is this your taxon?</DialogDescription>
            </DialogHeader>
            <INatConfirm onBack={() => setTaxonId(null)} onConfirm={onConfirm} taxonId={taxonId} />
        </DialogContent>
    );
};

const INatSearch = ({
    onSearchStringChange,
    onTaxonIdChange,
    searchString
}: {
    onSearchStringChange: (searchString: string) => void;
    onTaxonIdChange: (taxonId: number) => void;
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
                            className="not-last:border-b hover:bg-muted cursor-pointer"
                            onClick={() => onTaxonIdChange(result.id)}
                        >
                            <TaxonInfo
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
    onConfirm: (taxon: INatTaxonDetails) => void;
    taxonId: number;
}) => {
    const { data, isLoading } = useINatTaxon(taxonId);
    const taxon = data?.results?.length ? data.results[0] : null;

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center">
                    <Loader2Icon className="w-16 h-16 text-secondary animate-spin" />
                </div>
            ) : taxon ? (
                <div className="border rounded-md overflow-hidden">
                    <TaxonInfo
                        commonName={taxon.preferred_common_name}
                        label={taxon.name}
                        rank={taxon.rank}
                        thumbnailUrl={taxon.default_photo?.square_url}
                    />
                </div>
            ) : null}
            <div className="flex items-center justify-end gap-4">
                <Button variant="outline" onClick={() => onBack()}>
                    <span className="pt-0.5">Back</span>
                </Button>
                <Button disabled={!taxon} variant="success" onClick={() => onConfirm(taxon)}>
                    <span className="pt-0.5">Confirm</span>
                </Button>
            </div>
        </>
    );
};

const TaxonInfo = ({
    commonName,
    label,
    rank,
    thumbnailUrl
}: {
    commonName: string;
    label: string;
    rank: string;
    thumbnailUrl: string;
}) => (
    <div className="flex items-center gap-4">
        <div className="w-16 h-16 shrink-0 bg-muted border-r">
            {thumbnailUrl ? <img alt={label} className="w-full h-full object-cover" src={thumbnailUrl} /> : null}
        </div>
        <div className="grid gap-1">
            <span className="body-base font-medium">
                {rank !== 'species' ? <span className="capitalize">{rank}</span> : null} <span>{label}</span>
            </span>
            {commonName ? <span className="body-small text-muted-foreground">({commonName})</span> : null}
        </div>
    </div>
);
