import { type User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';

export const UserMenu = ({ user }: { user: User | null }) => (
    <div className="flex items-center gap-2">
        {user ? (
            <form action="/auth/logout" method="post">
                <Button size="sm" type="submit" variant="ghost">
                    <span className="pt-0.5">Logout</span>
                </Button>
            </form>
        ) : (
            <Link className={buttonVariants({ size: 'sm', variant: 'ghost' })} href="/auth/login">
                <span>Login</span>
            </Link>
        )}
    </div>
);
