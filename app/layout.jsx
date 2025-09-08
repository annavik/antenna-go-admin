import '../styles/globals.css';

export const metadata = {
    title: {
        template: '%s | Antenna Go Admin',
        default: 'Antenna Go Admin'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/favicon.png" sizes="any" />
            </head>
            <body className="antialiased text-white bg-blue-900">
                <div className="flex flex-col min-h-screen px-6 sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                        <main className="flex items-center justify-center grow">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}
