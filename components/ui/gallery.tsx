import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const Gallery = ({ children, size = 'default' }: { children: ReactNode; size?: 'default' | 'lg' }) => (
    <div
        className={cn('grid gap-4', {
            'grid-cols-5': size === 'lg',
            'grid-cols-5 xl:grid-cols-7': size === 'default'
        })}
    >
        {children}
    </div>
);

export const GalleryItem = ({
    children,
    description,
    href,
    image,
    title
}: {
    children?: ReactNode;
    description?: string;
    href: string;
    image?: string;
    title: string;
}) => (
    <Link className="bg-background border rounded-md relative overflow-hidden" href={href}>
        <div className="w-full aspect-square flex items-center justify-center border-b">
            {image ? (
                <img alt={title} className="w-full h-full object-contain bg-foreground" src={image} />
            ) : (
                <ImageIcon className="w-8 h-8 text-foreground/50" />
            )}
        </div>
        <div className="grid gap-1 p-4">
            <span className="body-base font-medium">{title}</span>
            {description ? <span className="body-small text-muted-foreground">{description}</span> : null}
        </div>
        {children}
    </Link>
);
