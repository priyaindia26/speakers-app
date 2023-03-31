
import { ISpeakerList } from 'src/app/core/models/speaker';

export interface ISpeakerState {
  speakerList: any;
}

export const initialSpeakerState: ISpeakerState = {
  speakerList: {} as ISpeakerList
};

