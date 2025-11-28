import { buttonVariants } from '@/components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';

const GBIF_URL = (taxonKey: string) => `https://www.gbif.org/species/${taxonKey}`;

export const GBIFLink = ({ label, taxonKey }: { label?: string; taxonKey: string }) => (
    <a
        className={buttonVariants({ variant: 'outline' })}
        href={GBIF_URL(taxonKey)}
        rel="noopener noreferrer"
        target="_blank"
    >
        <span className="pt-0.5">{label ?? taxonKey}</span>
        <ExternalLinkIcon className="w-4 h-4" />
    </a>
);
