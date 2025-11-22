export default async function RootLayout({ children }) {
    return (
        <div className="grow relative">
            <div className="w-full h-full absolute top-0 left-0 overflow-auto">{children}</div>
        </div>
    );
}
