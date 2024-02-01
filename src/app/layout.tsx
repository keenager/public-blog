import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./_components/nav/nav-bar";

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
      <head></head>
      <body className="mt-14 bg-white dark:bg-gray-900">
        <header className="fixed left-0 right-0 top-0 z-10 dark:bg-gray-900">
          <Navbar />
        </header>
        <main className="bg-white px-8 py-8 dark:bg-gray-900 md:px-16 md:py-16">
          {children}
        </main>
        <footer className="text-center bg-white dark:bg-gray-900">
          <span>Developed by RedTraining</span>
        </footer>
      </body>
    </html>
  );
}
