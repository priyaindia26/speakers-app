import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ISpeakerState } from '../states/speaker.state';

export const getSpeakersState = createFeatureSelector<ISpeakerState>('speakerList');

export const getAllSpeaker = createSelector(
  getSpeakersState,
  (state: ISpeakerState) => { return state.speakerList });




