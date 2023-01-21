import { useFirestoreWrite } from 'hooks/storage/useFirestoreWrite';

export const useWriteMessage = (id?: string) => {
    const messageWrite = useFirestoreWrite('messages', id);
    return messageWrite;
};
