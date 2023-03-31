import { ActionReducerMap } from '@ngrx/store';
import { speakerReducer } from './reducers/speaker.reducers';
import { ISpeakerState } from './states/speaker.state';

export const reducers: ActionReducerMap<ISpeakerState> = {
    speakerList: speakerReducer
};
