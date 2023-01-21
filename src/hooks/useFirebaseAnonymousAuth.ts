import { getAuth, signInAnonymously } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useFirebaseAnonymousAuth = () => {
    const [error, setError] = useState('');

    useEffect(() => {
        const auth = getAuth();
        signInAnonymously(auth)
            .catch((e) => {
                setError('An error occurred. Cannot connect to the server. Please try again later.');
            });
    }, []);

    return { error };
};
