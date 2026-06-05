import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SITE, SITE_META, SITE_URL, absoluteUrl } from "@/data/site";
import { AppProviders } from "@/components/providers/AppProviders";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { LayoutNavbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c8102e",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_META.title,
    template: SITE_META.titleTemplate,
  },
  description: SITE_META.description,
  keywords: [...SITE_META.keywords],
  applicationName: SITE.name,
  openGraph: {
    title: SITE_META.openGraph.title,
    description: SITE_META.openGraph.description,
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE.name,
    locale: "en_IN",
    images: [
      {
        url: absoluteUrl("/logo.png"),
        width: 512,
        height: 512,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_META.openGraph.title,
    description: SITE_META.openGraph.description,
    images: [absoluteUrl("/logo.png")],
  },
  icons: {
    icon: absoluteUrl("/logo.png"),
    apple: absoluteUrl("/logo.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${fredoka.variable} flex min-h-screen flex-col antialiased font-sans`}
      >
        <AppProviders>
          <AnnouncementBar />
          <div className="h-7 shrink-0" aria-hidden />
          <LayoutNavbar />
          <main className="flex-1 pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0">
            {children}
          </main>
          <Footer className="pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0" />
          <MobileBottomNav />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
