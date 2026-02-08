import type { Metadata } from "next";
import { IBM_Plex_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/src/lib/components/AppFooter";


const ibm_plex_mono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    subsets: ["latin", "cyrillic"],
    weight: ["100", "200", "300", "400", "500", "600", "700"]
});

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
    title: "rizamamedov | homepage",
    description: "hi it's webpage about me :)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${ibm_plex_mono.variable} ${montserrat.variable} antialiased`}
            >
                <AppProvider>
                    <AppHeader />
                    {children}
                    <AppFooter />
                </AppProvider>
                
            </body>
        </html>
    );
}
