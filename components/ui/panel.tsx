import { ReactNode } from 'react';

export const Panel = ({
    accessory,
    children,
    title,
    description
}: {
    accessory?: ReactNode;
    children: ReactNode;
    title: string;
    description?: string;
}) => (
    <div className="w-sm relative" style={{ background: 'pink' }}>
        <div className="h-full w-full absolute top-0 left-0 p-8 bg-muted border-r overflow-auto">
            <div className="grid gap-2 mb-8">
                <div className="flex items-center justify-between gap-2">
                    <span className="body-xlarge font-medium text-primary">{title}</span>
                    {accessory}
                </div>
                {description ? <span className="body-small text-muted-foreground">{description}</span> : null}
            </div>
            {children}
        </div>
    </div>
);
