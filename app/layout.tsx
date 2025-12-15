import { Header } from '@/components/header/header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { createClient } from '@/lib/supabase/server';
import { ConstructionIcon } from 'lucide-react';
import { Metadata } from 'next';
import localFont from 'next/font/local';
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
    const {
        data: { user }
    } = await supabase.auth.getUser();

    return (
        <html lang="en" className={Mazzard.className}>
            <head>
                <link rel="icon" href="/images/favicon.png" sizes="any" />
            </head>
            <body className="min-h-screen flex flex-col antialiased">
                <TooltipProvider>
                    <div className="hidden lg:contents">
                        <Header user={user} />
                        <main className="grow flex flex-col bg-muted">{children}</main>
                    </div>
                    <div className="grow flex flex-col items-center justify-center gap-8 px-8 bg-muted text-center lg:hidden">
                        <ConstructionIcon className="w-16 h-16 text-primary" />
                        <h1 className="heading-small text-primary font-medium">Screen size not supported</h1>
                        <p className="body-xlarge text-foreground/50">
                            This screen size is not yet supported, please switch to a larger screen.
                        </p>
                    </div>
                </TooltipProvider>
            </body>
        </html>
    );
}
