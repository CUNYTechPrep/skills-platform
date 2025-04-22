import '../globals.css';
import Sidebar from '@/components/sidebar'; // adjust path if needed
import React from 'react';

export const metadata = {
  title: 'Skills Platform',
  description: 'Your coding dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
