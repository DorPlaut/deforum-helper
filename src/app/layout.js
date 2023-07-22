import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Deforum Timeline Helper',
  description: 'Vissualize youre timeline for stable diffusion deforum',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>Deforum Timeline Helper</h1>
        <h2>Vissualize youre timeline for stable diffusion deforum</h2>
        {children}
      </body>
    </html>
  );
}
