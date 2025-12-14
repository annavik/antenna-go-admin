import { type User } from '@supabase/supabase-js';
import Form from 'next/form';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { logout } from './actions';
import LogoutButton from './logout-button';

export const UserMenu = ({ user }: { user: User | null }) => (
    <div className="flex items-center gap-2">
        {user ? (
            <Form action={logout}>
                <LogoutButton />
            </Form>
        ) : (
            <Link className={buttonVariants({ size: 'sm', variant: 'ghost' })} href="/auth/login">
                <span>Login</span>
            </Link>
        )}
    </div>
);
