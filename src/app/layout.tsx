import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SITE_META } from "@/data/site";
import { AppProviders } from "@/components/providers/AppProviders";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { LayoutNavbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_META.title,
    template: SITE_META.titleTemplate,
  },
  description: SITE_META.description,
  keywords: [...SITE_META.keywords],
  openGraph: {
    title: SITE_META.openGraph.title,
    description: SITE_META.openGraph.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${fredoka.variable} flex min-h-screen flex-col antialiased font-sans`}
      >
        <AppProviders>
          <AnnouncementBar />
          <div className="h-7 shrink-0" aria-hidden />
          <LayoutNavbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
