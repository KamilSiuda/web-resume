import { useDispatch, useSelector } from 'react-redux';
import { appStateActions } from 'store/appState.reducer';
import { RootState } from 'store/store';

export const useContrastMode = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.appState.mode);

    const toggle = () => {
        dispatch(appStateActions.toggleMode());
    };

    return {
        mode,
        toggle
    };
};
