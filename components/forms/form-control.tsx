import { ReactNode } from 'react';

export const FormControl = ({
    accessory,
    children,
    label
}: {
    accessory?: ReactNode;
    label: string;
    children: ReactNode;
}) => (
    <div className="grid gap-1">
        <div className="flex items-center justify-between gap-2">
            <label className="label text-muted-foreground font-semibold">{label}</label>
            {accessory}
        </div>
        {children}
    </div>
);
