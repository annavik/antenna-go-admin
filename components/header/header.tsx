import { type User } from '@supabase/supabase-js';
import Link from 'next/link';
import { Menu } from './menu';
import { UserMenu } from './user-menu';

export const Header = ({ user }: { user: User | null }) => (
    <header className="px-8 py-4 flex items-center justify-between gap-8 bg-background border-b">
        <div className="flex items-center gap-8">
            <Link href="/">
                <img alt="Antenna logo" className="w-8 h-8" src="/images/favicon.png" />
            </Link>
            <Menu />
        </div>
        <UserMenu user={user} />
    </header>
);
