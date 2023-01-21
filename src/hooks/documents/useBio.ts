import { useFireStoreDocument } from 'hooks/storage/useFirestoreDocument';

export const useBio = () => {
    const bio = useFireStoreDocument('bio', 'myself');
    return bio;
};
