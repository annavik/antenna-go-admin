'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';

export const BackButton = () => {
    const router = useRouter();

    return (
        <Button variant="ghost" onClick={() => router.back()}>
            <span className="pt-0.5">Back</span>
        </Button>
    );
};
