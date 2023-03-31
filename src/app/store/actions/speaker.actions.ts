import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { SpeakerParams } from "src/app/core/models/speaker-params";
import { ISpeakerList } from "src/app/core/models/speaker";

enum SpeakerActionType {
  Loading = "[Speaker] Loading",
  LoadSpeakersSuccess = "[Speaker] Loaded Success",
  loadSpeakersFailure = "[Speaker] Loaded Failure",
}

export const getSpeakers = createAction(
  SpeakerActionType.Loading,
  props<{ params: SpeakerParams }>()
);

export const loadSpeakersSuccess = createAction(
  SpeakerActionType.LoadSpeakersSuccess,
  props<{ speakerList: ISpeakerList }>()
)

export const loadSpeakersFailure = createAction(
  SpeakerActionType.loadSpeakersFailure,
  props<{ error: HttpErrorResponse }>()
)
