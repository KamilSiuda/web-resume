import { useFirebase } from 'providers/FirebaseProvider';
import { setDoc, doc } from 'firebase/firestore';
import { FirestoreCollectionNames, FirestoreCollections } from 'models/storage/FirestoreCollections';
import { uuidv4 } from '@firebase/util';
import { useState } from 'react';

export const useFirestoreWrite = <T extends FirestoreCollectionNames>(collection: T, id?: string) => {
    const { storage } = useFirebase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const write = async (entity: FirestoreCollections[T], id?: string) => {
        setError(false);
        setLoading(true);
        if (!storage) {
            setError(true);
            setLoading(false);
            return;
        }

        try {
            const document = doc(storage, collection, uuidv4());
            await setDoc(document, { ...entity, timestamp: Date.now() });
            return true;
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
        return false;
    };

    return {
        write,
        isLoading: loading,
        isError: error
    };
};
