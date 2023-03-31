import {
  initialSpeakerState
} from "../states/speaker.state";
import * as speakerActions from "../actions/speaker.actions";
import { createReducer, on } from "@ngrx/store";

export const featureKey = 'speakerList';
export const speakerReducer = createReducer(
  initialSpeakerState,
  on(speakerActions.getSpeakers, (state) => ({ ...state, loading: true })),
  on(speakerActions.loadSpeakersSuccess, (state, action) => {
    return { ...state, speakerList: action.speakerList }
  }),
  on(speakerActions.loadSpeakersFailure, (state) => {
    return {
      ...state, error: true,
      loading: false,
      total: 0
    }
  }),
);




