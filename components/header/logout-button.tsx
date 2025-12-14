'use client';

import { Button } from '@/components/ui/button';
import { LoadingIcon } from '@/components/ui/loading/loading-icon';
import { useFormStatus } from 'react-dom';

export default function LogoutButton() {
    const { pending } = useFormStatus();

    return (
        <Button size="sm" type="submit" variant="ghost">
            <span className="pt-0.5">Logout</span>
            {pending ? <LoadingIcon /> : null}
        </Button>
    );
}
