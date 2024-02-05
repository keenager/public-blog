import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/nav/nav-bar";
import Script from "next/script";
import GoogleAd from "./_components/common/google-ad";

export const metadata: Metadata = {
  title: "RedTraining's Homepage",
  description: "법률 공부하며 취미로 코딩하는 40대 아들바보 아저씨의 홈페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="mt-14 bg-white dark:bg-gray-900">
        <header className="fixed left-0 right-0 top-0 z-10 dark:bg-gray-900">
          <Navbar />
        </header>
        <main className="bg-white px-8 py-8 dark:bg-gray-900 md:px-16 md:py-16">
          {children}
        </main>
        <GoogleAd />
        <footer className="text-center bg-white dark:bg-gray-900">
          <span>Developed by RedTraining</span>
        </footer>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7732668394666746"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        ></Script>
      </body>
    </html>
  );
}
