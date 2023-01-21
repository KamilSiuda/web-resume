import { useQuery } from '@tanstack/react-query';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useFirebase } from 'providers/FirebaseProvider';

export const useFileStorage = (bucketPath: string, itemName: string) => {
    const { app } = useFirebase();
    const storage = getStorage(app);

    const getItem = () => {
        if (!itemName) {
            throw new Error('Item not defined');
        }
        const itemReference = ref(storage, `${bucketPath}/${itemName}`);
        return getDownloadURL(itemReference)
            .catch(e => {
                throw e?.code || 'Unkown error';
            });
    };

    const query = useQuery([`fileStorage_${itemName}`], getItem);
    return query;
};
