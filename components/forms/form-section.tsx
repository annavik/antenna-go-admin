import { ReactNode } from 'react';

export const FormSection = ({ children, label }: { children: ReactNode; label: string }) => (
    <div className="grid gap-8">
        <h2 className="body-xlarge font-medium">{label}</h2>
        {children}
    </div>
);
