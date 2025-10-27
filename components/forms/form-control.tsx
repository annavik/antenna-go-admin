import { ReactNode } from 'react';

export const FormControl = ({ children, label }: { label: string; children: ReactNode }) => (
    <div className="grid gap-1">
        <label className="label text-muted-foreground font-semibold">{label}</label>
        {children}
    </div>
);
