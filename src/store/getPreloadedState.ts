// import { initialToDoState } from './SelectorAndTests/reducer';
import { PartialRootState } from './configureStore';

const getPreloadedState = (): PartialRootState => {
    return {
        // ToDo: {
        //     ...initialToDoState,
        // },
    };
};

export default getPreloadedState;
