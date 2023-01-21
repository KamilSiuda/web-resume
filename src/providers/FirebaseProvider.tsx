import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import React, { useContext, useMemo } from 'react';
import { firebaseConfig } from 'storage/storageConfig';

export const FirebaseContext = React.createContext<{app?: FirebaseApp, storage?: Firestore}>({});

export const FirebaseContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const app = useMemo(() => initializeApp(firebaseConfig), []);
    const storage = useMemo(() => getFirestore(app), []);

    const context = useMemo(() => ({
        app,
        storage,
    }), [app, storage]);

    return <FirebaseContext.Provider value={context}>
        {children}
    </FirebaseContext.Provider>;
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    return context;
};
