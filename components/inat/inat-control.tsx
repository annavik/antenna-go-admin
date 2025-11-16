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
import { LABELS } from '@/lib/taxa/constants';
import { convertINatTaxon } from '@/lib/taxa/convert-inat-taxon';
import { ExternalLinkIcon, Loader2Icon, SearchIcon, XIcon } from 'lucide-react';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Checkbox } from '../ui/checkbox';

const getINatUrl = (iNatTaxonId: string) => `https://www.inaturalist.org/taxa/${iNatTaxonId}`;

export const INatControl = ({
    taxon,
    onTaxonChange
}: {
    taxon: Tables<'taxa'>;
    onTaxonChange: (taxon: Tables<'taxa'>) => void;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center gap-2">
            {taxon.inat_taxon_id ? (
                <div className="flex items-center gap-2">
                    <a
                        className={buttonVariants({ variant: 'outline' })}
                        href={getINatUrl(taxon.inat_taxon_id)}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <span className="pt-0.5">{taxon.inat_taxon_id}</span>
                        <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                    <Button
                        onClick={() => onTaxonChange({ ...taxon, inat_taxon_id: null })}
                        size="icon"
                        variant="ghost"
                    >
                        <XIcon className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <span>Search iNaturalist</span>
                            <SearchIcon className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <INatForm
                        onConfirm={(fields) => {
                            onTaxonChange({ ...taxon, ...fields });
                            setIsOpen(false);
                        }}
                    />
                </Dialog>
            )}
        </div>
    );
};

const INatForm = ({ onConfirm }: { onConfirm: (fields: { [key: string]: string }) => void }) => {
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
                <DialogTitle>Confirm import</DialogTitle>
                <DialogDescription>You can import all or some fields.</DialogDescription>
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
    onConfirm: (fields: { [key: string]: string }) => void;
    taxonId: number;
}) => {
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});
    const { data, isLoading } = useINatTaxon(taxonId);
    const iNatTaxon = data?.results?.length ? data.results[0] : undefined;
    const fields = useMemo(() => (iNatTaxon ? convertINatTaxon(iNatTaxon) : undefined), [iNatTaxon]);

    useEffect(() => {
        // Set all fields as selected from start
        if (fields) {
            setChecked(Object.fromEntries(Object.keys(fields).map((key) => [key, true])));
        }
    }, [fields]);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center">
                    <Loader2Icon className="w-16 h-16 text-secondary animate-spin" />
                </div>
            ) : fields ? (
                <div className="grid gap-4 py-4" style={{ gridTemplateColumns: 'auto auto 1fr' }}>
                    {Object.entries(fields).map(([key, value]) => (
                        <Fragment key={key}>
                            <div className="flex h-5 items-center">
                                <Checkbox
                                    checked={checked[key] ?? false}
                                    id={key}
                                    onCheckedChange={() => setChecked((prev) => ({ ...prev, [key]: !checked[key] }))}
                                />
                            </div>
                            <label className="pt-0.5 body-small font-medium whitespace-nowrap" htmlFor={key}>
                                {LABELS[key]}
                            </label>
                            {key === 'cover_image_url' || key === 'cover_image_thumbnail_url' ? (
                                <img alt="" className="max-h-32 bg-muted rounded-md border" src={value} />
                            ) : (
                                <span className="pt-0.5 body-small text-muted-foreground">{value}</span>
                            )}
                        </Fragment>
                    ))}
                </div>
            ) : null}
            <div className="flex items-center justify-end gap-4">
                <Button onClick={() => onBack()} variant="outline">
                    <span className="pt-0.5">Back</span>
                </Button>
                <Button
                    disabled={!fields}
                    onClick={() => {
                        const checkedFields = Object.fromEntries(
                            Object.entries(fields).filter(([key]) => checked[key])
                        );
                        onConfirm(checkedFields);
                    }}
                    variant="success"
                >
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
