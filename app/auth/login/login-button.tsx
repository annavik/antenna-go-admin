'use client';

import { Button } from '@/components/ui/button';
import { LoadingIcon } from '@/components/ui/loading/loading-icon';
import { useFormStatus } from 'react-dom';

export default function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" variant="success">
            <span className="pt-0.5">Login</span>
            {pending ? <LoadingIcon /> : null}
        </Button>
    );
}
