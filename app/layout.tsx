import { CreateTaxaList } from '@/components/taxa-lists/create-taxa-list';
import { Panel } from '@/components/ui/panel';
import { TooltipProvider } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.css';
import '../styles/typography.css';
import { TaxaListLink } from './taxa-list-link';

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
    const { data: taxaLists } = await supabase.from('taxa_lists').select().order('created_at');

    return (
        <html lang="en" className={Mazzard.className}>
            <head>
                <link rel="icon" href="/images/favicon.png" sizes="any" />
            </head>
            <body className="min-h-screen flex flex-col antialiased">
                <TooltipProvider>
                    <header className="h-12 px-8 flex items-center justify-between gap-2 bg-background border-b">
                        <img alt="Antenna logo" className="w-8 h-8" src="/images/favicon.png" />
                        <span className="label text-muted-foreground font-semibold">Under construction</span>
                    </header>
                    <main className="flex flex-col grow">
                        <div className="flex grow">
                            <Panel accessory={<CreateTaxaList />} title="Taxa lists">
                                <div className="grid gap-2">
                                    {taxaLists?.map((taxaList) => (
                                        <TaxaListLink key={taxaList.id} taxaList={taxaList} />
                                    ))}
                                </div>
                            </Panel>
                            {children}
                        </div>
                    </main>
                </TooltipProvider>
            </body>
        </html>
    );
}
