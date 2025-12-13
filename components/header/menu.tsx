'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { ReactNode } from 'react';
import { buttonVariants } from '../ui/button';

export const Menu = () => {
    const activeSegment = useSelectedLayoutSegment();

    return (
        <nav>
            <ul className="flex items-center gap-4">
                <MenuItem href="/" isActive={activeSegment === null || activeSegment === 'taxa-list'}>
                    <span className="pt-0.5">Taxa lists</span>
                </MenuItem>
                <MenuItem href="/about" isActive={activeSegment === 'about'}>
                    <span className="pt-0.5">About</span>
                </MenuItem>
            </ul>
        </nav>
    );
};

const MenuItem = ({ isActive, href, children }: { isActive?: boolean; href: string; children: ReactNode }) => (
    <li>
        <Link className={buttonVariants({ size: 'sm', variant: isActive ? 'secondary' : 'ghost' })} href={href}>
            {children}
        </Link>
    </li>
);
