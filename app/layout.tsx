import { buttonVariants } from '@/components/ui/button';
import { Panel } from '@/components/ui/panel';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import '../styles/globals.css';
import '../styles/typography.css';

const Mazzard = localFont({
    src: [
        {
            path: '../public/fonts/mazzardsoftm-regular.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../public/fonts/mazzardsoftm-italic.otf',
            weight: '400',
            style: 'italic'
        },
        {
            path: '../public/fonts/mazzardsoftm-medium.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../public/fonts/mazzardsoftm-mediumitalic.otf',
            weight: '500',
            style: 'italic'
        },
        {
            path: '../public/fonts/mazzardsoftm-semibold.otf',
            weight: '600',
            style: 'normal'
        },
        {
            path: '../public/fonts/mazzardsoftm-semibolditalic.otf',
            weight: '600',
            style: 'italic'
        }
    ]
});

export const metadata: Metadata = {
    title: {
        template: '%s | Antenna Go Admin',
        default: 'Antenna Go Admin'
    }
};

export default async function RootLayout({ children }) {
    const supabase = await createClient();
    const { data: taxaLists } = await supabase.from('taxa_lists').select();

    return (
        <html lang="en" className={Mazzard.className}>
            <head>
                <link rel="icon" href="/images/favicon.png" sizes="any" />
            </head>
            <body className="min-h-screen flex flex-col antialiased">
                <header className="h-10 bg-background border-border border-b"></header>
                <main className="flex flex-col grow">
                    <div className="flex grow">
                        <Panel title="Taxa lists">
                            <div className="grid gap-2">
                                {taxaLists.map((taxaList) => (
                                    <Link
                                        className={cn(buttonVariants({ variant: 'outline' }), 'justify-between')}
                                        href={`/taxa-list/${taxaList.id}`}
                                        key={taxaList.id}
                                    >
                                        <span className="pt-0.5">{taxaList.name}</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                ))}
                            </div>
                        </Panel>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
