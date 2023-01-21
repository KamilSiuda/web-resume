import { useContrastMode } from 'hooks/useContrastMode';
import { firebaseConfig } from 'storage/storageConfig';
import { useFileStorage } from './useFileStorage';

export const useAvatar = (itemName: string) => {
    const { mode } = useContrastMode();
    const avatarName = mode === 'dark'
        ? `${itemName.substring(0, itemName.indexOf('.'))}_dark${itemName.substring(itemName.indexOf('.'))}`
        : itemName;
    const avatar = useFileStorage(`gs://${firebaseConfig.storageBucket}`, avatarName);
    return avatar;
};
