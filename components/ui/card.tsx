import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';

export const Card = ({
    description,
    href,
    image,
    isActive,
    label,
    withImage
}: {
    description?: string;
    href: string;
    image?: string;
    isActive?: boolean;
    label: string;
    withImage?: boolean;
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
        {withImage ? (
            <div className="shrink-0 w-16 h-16 flex items-center justify-center bg-muted border-r">
                {image ? (
                    <img alt={label} className="w-full h-full object-cover" src={image} />
                ) : (
                    <ImageIcon className="w-4 h-4 text-foreground/50" />
                )}
            </div>
        ) : null}
        <div className="grow grid gap-1 px-3 py-2">
            <span className="pt-0.5 body-base font-medium truncate">{label}</span>
            {description ? (
                <span className="pt-0.5 body-small text-muted-foreground truncate">{description}</span>
            ) : null}
        </div>
    </Link>
);
