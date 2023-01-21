import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { useFireStore } from '../storage/useFirestore';

export const useEducation = () => {
    const educationStore = useFireStore('education', {
        fieldConverters: {
            description: (description: string) => description.replaceAll('\\n', '\n'),
            from: (from: Timestamp) => dayjs.unix(from?.seconds),
            to: (to: Timestamp) => to ? dayjs.unix(to?.seconds) : undefined
        },
        queryConfig: { suspense: false }
    });
    return educationStore;
};
