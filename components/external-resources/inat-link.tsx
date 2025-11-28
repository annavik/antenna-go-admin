import { buttonVariants } from '@/components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';

const INAT_URL = (taxonId: string) => `https://www.inaturalist.org/taxa/${taxonId}`;

export const INatLink = ({ label, taxonId }: { label?: string; taxonId: string }) => (
    <a
        className={buttonVariants({ variant: 'outline' })}
        href={INAT_URL(taxonId)}
        rel="noopener noreferrer"
        target="_blank"
    >
        <span className="pt-0.5">{label ?? taxonId}</span>
        <ExternalLinkIcon className="w-4 h-4" />
    </a>
);
