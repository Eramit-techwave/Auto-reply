import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Auto-Reply',
  description: 'Schedule your messages',
};

async function initScheduler() {
  try {
    await fetch('http://localhost:3000/api/init');
  } catch (e) {
    console.log('Scheduler init failed:', e.message);
  }
}

initScheduler();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}