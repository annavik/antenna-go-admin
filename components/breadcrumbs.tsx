import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';

export const Breadcrumbs = ({ items }: { items: { href?: string; label: string }[] }) => (
    <div className="flex items-center gap-2">
        {items.map((item, index) => (
            <Fragment key={index}>
                {item.href ? (
                    <Link className="body-small font-medium text-primary" href={item.href}>
                        {item.label}
                    </Link>
                ) : (
                    <span className="body-small font-medium">{item.label}</span>
                )}
                {index < items.length - 1 ? <ChevronRight className="w-4 h-4 text-muted-foreground" /> : null}
            </Fragment>
        ))}
    </div>
);
