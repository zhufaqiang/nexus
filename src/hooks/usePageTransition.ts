// hooks/usePageTransition.ts
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const usePageTransition = (duration: number = 1200) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timeout);
  }, [pathname, duration]);

  return { loading };
};
