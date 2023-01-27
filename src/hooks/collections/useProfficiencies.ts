import { useFireStore } from 'hooks/storage/useFirestore';

export const useProfficiencies = () => {
    const profficiencies = useFireStore('profficiencies', { queryConfig: { suspense: false } });
    return profficiencies;
};
