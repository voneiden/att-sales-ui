import { useEffect } from 'react';

export function usePageTitle(title: string) {
  const titlePostfix = 'Asuntomyynti';

  useEffect(() => {
    const prevTitle = document.title;

    if (title) {
      document.title = `${title} - ${titlePostfix}`;
    } else {
      document.title = titlePostfix;
    }

    return () => {
      document.title = prevTitle ? prevTitle : 'Asuntomyynti';
    };
  });
}
