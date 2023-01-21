import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { FirestoreCollectionFieldConverter } from 'models/storage/FieldConverters';
import { FirestoreCollectionNames, FirestoreCollections } from 'models/storage/FirestoreCollections';
import { FirestoreDocument } from 'models/storage/FirestoreDocument';
import { QueryOptionsShorthand } from 'models/utils/ReactQuery';
import { useFirebase } from 'providers/FirebaseProvider';
import { ObjectEntriesTyped } from 'utils/object';

export type FirestoreCollectionHookOptions<T extends FirestoreCollectionNames> = {
    fieldConverters?: FirestoreCollectionFieldConverter<T>;
    queryConfig?: QueryOptionsShorthand;
};

export const useFireStore = <T extends FirestoreCollectionNames, >(
    collectionName: T, options: FirestoreCollectionHookOptions<T> = {}
) => {
    const { storage } = useFirebase();
    const { fieldConverters, queryConfig } = options;

    const getCollection = async () => {
        if (!storage) {
            throw new Error('Storage not initialized');
        }

        const projectsCollection = collection(storage, collectionName);
        const projectsSnapshot = await getDocs(projectsCollection);
        const transformData = (data: any) => {
            if (!fieldConverters) {
                return data;
            }
            const transformedData = data;
            ObjectEntriesTyped(fieldConverters).forEach(([key, converterFn]) => {
                transformedData[key] = converterFn ? converterFn(data[key]) : data[key];
            });
            return transformedData;
        };
        const result: Array<FirestoreCollections[T] & FirestoreDocument> =
            projectsSnapshot.docs.map(p => ({ fireId: p.id, ...(transformData(p.data()) as FirestoreCollections[T]) }));
        return result;
    };

    const { isLoading, isError, data, error } = useQuery([collectionName], getCollection, queryConfig);

    return {
        isLoading, isError, data, error
    };
};
