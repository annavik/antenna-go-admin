import { type User } from '@supabase/supabase-js';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';

export const UserMenu = ({ user }: { user: User | null }) => (
    <div className="flex items-center gap-2">
        {user ? (
            <>
                <Button size="icon" variant="outline">
                    <UserIcon className="w-4 h-4" />
                </Button>
                <form action="/auth/logout" method="post">
                    <Button size="sm" type="submit" variant="ghost">
                        <span className="pt-0.5">Logout</span>
                    </Button>
                </form>
            </>
        ) : (
            <Link className={buttonVariants({ size: 'sm', variant: 'ghost' })} href="/auth/login">
                <span>Login</span>
            </Link>
        )}
    </div>
);
