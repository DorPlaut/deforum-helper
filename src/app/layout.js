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
        <main>
          <div className="header">
            <h1>Deforum Timeline Helper</h1>
            <h2>Visualize your timeline for Stable diffusion Deforum</h2>
          </div>
          {children}
        </main>
        <div className="footer-spacer" />
        <footer>
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
    </html>
  );
}
