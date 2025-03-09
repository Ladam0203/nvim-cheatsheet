import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Neovim Cheatsheet – Search, Save & Customize Vim Commands",
    description: "Explore essential Neovim and Vim commands, remaps, plugin commands, and create a personalized cheatsheet to boost text editing efficiency."
};


export default function RootLayout({children}) {
    const canonicalUrl = "https://nvim-cheatsheet.vercel.app";

    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <meta name="canonical" content={canonicalUrl}/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        <Analytics />
        </body>
        </html>
    );
}
