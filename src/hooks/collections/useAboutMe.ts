import { useFireStore } from 'hooks/storage/useFirestore';

export const useAboutMe = () => {
    const about = useFireStore('about', { fieldConverters: { content: (content: string) => content.replaceAll('\\n', '\n') } });
    return about;
};
