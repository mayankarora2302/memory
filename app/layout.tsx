import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FilmGrain from "@/components/effects/FilmGrain";
import CursorTrail from "@/components/effects/CursorTrail";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Our Love on Netflix | A Love Series",
    description: "A cinematic journey through our love story - An 8-day Netflix Original Series",
    keywords: ["love", "romance", "valentine", "anniversary", "netflix", "series"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} film-grain`}>
                {children}
                <FilmGrain />
                <CursorTrail />
            </body>
        </html>
    );
}
