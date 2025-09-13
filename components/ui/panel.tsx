import { ReactNode } from 'react';

export const Panel = ({
    children,
    title,
    description
}: {
    children: ReactNode;
    title: string;
    description?: string;
}) => (
    <div className="w-sm shrink-0 p-8 bg-muted border-border border-r">
        <div className="grid gap-2 mb-8">
            <span className="body-xlarge font-medium text-primary">{title}</span>
            {description ? <span className="body-small text-muted-foreground">{description}</span> : null}
        </div>
        {children}
    </div>
);
