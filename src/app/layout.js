import './globals.css';
import { Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Deforum Timeline Helper',
  description: 'Vissualize youre timeline for stable diffusion deforum',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />

        <main>
          <div className="header animation-fade-in">
            <h1>Deforum Timeline Helper</h1>
            <h2>Visualize your timeline for Stable Diffusion Deforum</h2>
          </div>
          {children}
        </main>
        <div className="footer-spacer " />
        <footer className="animation-fade-in">
          <span>
            Built by{' '}
            <a
              href="https://dorplaut.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Dor Plaut
            </a>
          </span>
        </footer>
      </body>
      {/* <Script
        src="https://example.com/script.js"
        id="example-script"
        nonce="XUENAJFW"
        data-test="script"
      /> */}
    </html>
  );
}
