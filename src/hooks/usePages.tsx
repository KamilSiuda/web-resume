import { SiteNavigation } from 'routing/SiteNavigation';
import { useMemo } from 'react';

export const usePages = () => {
    const pages = useMemo(() => Object.values(SiteNavigation), []);
    return pages;
};
