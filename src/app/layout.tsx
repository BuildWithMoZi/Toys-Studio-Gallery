import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
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
    default: "PlayJoy Toys — Magical Toys for Happy Kids",
    template: "%s | PlayJoy Toys",
  },
  description:
    "Premium kids-friendly toy shop. Educational toys, plushies, games & more. Order directly via WhatsApp — fast delivery, safe & fun!",
  keywords: ["toys", "kids toys", "educational toys", "plush toys", "online toy shop"],
  openGraph: {
    title: "PlayJoy Toys",
    description: "Where every toy sparks joy!",
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
          <LayoutNavbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
