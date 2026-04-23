import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./hooks/useTheme";
import ThemeControls from "./components/ThemeControls";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#22d3d3",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ronakneema.github.io"),
  title: "Ronak Neema | DevOps Engineer & Full Stack Developer",
  description: "Portfolio of Ronak Neema - DevOps Engineer and Full Stack Developer specializing in AWS, CI/CD, TypeScript, React, and Node.js.",
  keywords: "DevOps Engineer, Full Stack Developer, AWS, CI/CD, TypeScript, React, Node.js, Portfolio, Ronak Neema",
  authors: [{ name: "Ronak Neema" }],
  creator: "Ronak Neema",
  publisher: "Ronak Neema",
  applicationName: "Ronak Portfolio",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ronakneema.github.io/ronak-portfolio/",
    title: "Ronak Neema | DevOps Engineer & Full Stack Developer",
    description: "Portfolio showcasing projects and experience in DevOps, AWS, CI/CD, and Full Stack Development",
    siteName: "Ronak Neema Portfolio",
    images: [
      {
        url: "/ronak-portfolio/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ronak Neema Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronak Neema | DevOps Engineer & Full Stack Developer",
    description: "Portfolio showcasing projects and experience in DevOps, AWS, CI/CD, and Full Stack Development",
    images: ["/ronak-portfolio/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <ThemeControls />
        </ThemeProvider>
      </body>
    </html>
  );
}
