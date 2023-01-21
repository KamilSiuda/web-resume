import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { FirestoreCollectionNames, FirestoreCollections } from 'models/storage/FirestoreCollections';
import { useFirebase } from 'providers/FirebaseProvider';
import { ObjectEntriesTyped } from 'utils/object';
import { FirestoreCollectionHookOptions } from './useFirestore';

export const useFireStoreDocument =

    <T extends FirestoreCollectionNames, >(
        collection: T,
        docId: string,
        options: FirestoreCollectionHookOptions<T> = {}) => {
        const { storage } = useFirebase();
        const { fieldConverters, queryConfig } = options;

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

        const getDocument = async () => {
            if (!storage) {
                throw new Error('Storage not initialized');
            }
            const docRef = doc(storage, collection, docId);
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                return transformData(docSnapshot.data()) as FirestoreCollections[T];
            } else {
                throw new Error('No such document');
            }
        };

        const query = useQuery([`fireDocument_${docId}`], getDocument, queryConfig);
        return query;
    };
