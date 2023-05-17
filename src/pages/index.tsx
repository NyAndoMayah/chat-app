import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!window.localStorage.getItem('informations')) {
      router.push('/signUp').catch((err: any) => console.log(err));
    } else {
      router.push('/chat').catch((err: any) => console.log(err));
    }
  }, []);
}
