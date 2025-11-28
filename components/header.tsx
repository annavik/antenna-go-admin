'use client';

import { LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';
import { buttonVariants } from './ui/button';

export const Header = () => {
    const activeSegment = useSelectedLayoutSegment();

    return (
        <header className="h-12 px-8 flex items-center justify-between gap-8 bg-background border-b">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <img alt="Antenna logo" className="w-8 h-8" src="/images/favicon.png" />
                </Link>
                <Menu>
                    <MenuItem href="/" isActive={activeSegment === null || activeSegment === 'taxa-list'}>
                        <span className="pt-0.5">Taxa lists</span>
                    </MenuItem>
                    <MenuItem href="/admin" isActive={activeSegment === 'admin'}>
                        <LockIcon className="w-4 h-4" />
                        <span className="pt-0.5">Admin</span>
                    </MenuItem>
                </Menu>
            </div>
            <span className="label text-muted-foreground font-semibold">Under construction</span>
        </header>
    );
};

const Menu = ({ children }: { children: ReactNode }) => (
    <nav>
        <ul className="flex items-center gap-4">{children}</ul>
    </nav>
);

const MenuItem = ({ isActive, href, children }: { isActive?: boolean; href: string; children: ReactNode }) => (
    <li>
        <Link className={buttonVariants({ size: 'sm', variant: isActive ? 'secondary' : 'ghost' })} href={href}>
            {children}
        </Link>
    </li>
);
