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


const f= [
  0:(1.00),    1:(0.97),    2:(0.87),    3:(0.71),    4:(0.50),    5:(0.26),    6:(0.00),   7:(-0.26),   8:(-0.50),   9:(-0.71),  10:(-0.87),  11:(-0.97),  12:(-1.00),  13:(-0.97),  14:(-0.87),  15:(-0.71),  16:(-0.50),  17:(-0.26),   18:(0.00),   19:(0.26),   20:(0.50),   21:(0.71),   22:(0.87),   23:(0.97),
 24:(1.00),   25:(0.97),   26:(0.87),   27:(0.71),   28:(0.50),   29:(0.26),   30:(0.00),  31:(-0.26),  32:(-0.50),  33:(-0.71),  34:(-0.87),  35:(-0.97),  36:(-1.00),  37:(-0.97),  38:(-0.87),  39:(-0.71),  40:(-0.50),  41:(-0.26),   42:(0.00),   43:(0.26),   44:(0.50),   45:(0.71),   46:(0.87),   47:(0.97),
 48:(1.00),   49:(0.97),   50:(0.87),   51:(0.71),   52:(0.50),   53:(0.26),   54:(0.00),  55:(-0.26),  56:(-0.50),  57:(-0.71),  58:(-0.87),  59:(-0.97),  60:(-1.00),  61:(-0.97),  62:(-0.87),  63:(-0.71),  64:(-0.50),  65:(-0.26),   66:(0.00),   67:(0.26),   68:(0.50),   69:(0.71),   70:(0.87),   71:(0.97),
 72:(1.00),   73:(0.97),   74:(0.87),   75:(0.71),   76:(0.50),   77:(0.26),   78:(0.00),  79:(-0.26),  80:(-0.50),  81:(-0.71),  82:(-0.87),  83:(-0.97),  84:(-1.00),  85:(-0.97),  86:(-0.87),  87:(-0.71),  88:(-0.50),  89:(-0.26),   90:(0.00),   91:(0.26),   92:(0.50),   93:(0.71),   94:(0.87),   95:(0.97),
 96:(1.00),   97:(0.97),   98:(0.87),   99:(0.71),  100:(0.50),  101:(0.26),  102:(0.00), 103:(-0.26), 104:(-0.50), 105:(-0.71), 106:(-0.87), 107:(-0.97), 108:(-1.00), 109:(-0.97), 110:(-0.87), 111:(-0.71), 112:(-0.50), 113:(-0.26),  114:(0.00),  115:(0.26),  116:(0.50),  117:(0.71),  118:(0.87),  119:(0.97)]