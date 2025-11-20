import { ImageIcon } from 'lucide-react';

export const SearchResult = ({
    commonName,
    label,
    rank,
    thumbnailUrl
}: {
    commonName?: string;
    label: string;
    rank: string;
    thumbnailUrl?: string;
}) => (
    <div className="flex items-center gap-4">
        <div className="shrink-0 w-16 h-16 flex items-center justify-center bg-muted border-r">
            {thumbnailUrl ? (
                <img alt={label} className="w-full h-full object-cover" src={thumbnailUrl} />
            ) : (
                <ImageIcon className="w-4 h-4 text-foreground/50" />
            )}
        </div>
        <div className="grid gap-1">
            <span className="body-base font-medium">
                {rank !== 'species' ? <span className="capitalize">{rank}</span> : null} <span>{label}</span>
            </span>
            {commonName ? <span className="body-small text-muted-foreground">({commonName})</span> : null}
        </div>
    </div>
);
