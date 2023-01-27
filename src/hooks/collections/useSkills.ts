import { useFireStore } from 'hooks/storage/useFirestore';

export const useSkills = () => {
    const skills = useFireStore('skills', { queryConfig: { suspense: false } });
    return skills;
};
