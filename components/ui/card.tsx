import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Card = ({
    description,
    href,
    image,
    isActive,
    label
}: {
    description?: string;
    href: string;
    image?: string;
    isActive?: boolean;
    label: string;
}) => (
    <Link
        className={cn(
            'flex items-center bg-background border rounded-md overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            {
                'ring-2 ring-secondary ring-offset-2': isActive
            }
        )}
        href={href}
    >
        {image ? <img alt="" className="w-16 h-16 object-cover" src={image} /> : null}
        <div className="grow grid gap-1 px-3 py-2">
            <span className="pt-0.5 body-base font-medium truncate">{label}</span>
            {description ? (
                <span className="pt-0.5 body-small text-muted-foreground truncate">{description}</span>
            ) : null}
        </div>
    </Link>
);
