import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happiee Birthday Kavithaaa",
  description:
    "A little collection of memories, moments and everything that makes you special.",
  openGraph: {
    title: "Happiee Birthday Kavithaaa",
    description:
      "A little collection of memories, moments and everything that makes you special.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Caveat:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-ink antialiased">{children}</body>
    </html>
  );
}
