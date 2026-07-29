import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iconic Sports Complexes - Premium Poster Generator",
  description: "Generate museum-quality posters of the world's most iconic sporting venues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-amber-700 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl font-serif font-bold text-amber-500 tracking-widest">
              ICONIC SPORTS COMPLEXES
            </h1>
            <p className="text-sm text-amber-600 mt-1">
              Museum-Quality Sporting Venue Posters
            </p>
          </div>
        </header>
        <main className="flex-1 pt-24 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
