import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { map, catchError, of, Observable, mergeMap } from "rxjs";

import { ISpeakerList } from "src/app/core/models/speaker";
import { SpeakerService } from "src/app/shared/speaker.service";
import { SpeakerParams } from "../../core/models/speaker-params";
import { loadSpeakersFailure, loadSpeakersSuccess, getSpeakers } from "../actions/speaker.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private service: SpeakerService) { }

  public loadUser$ = createEffect(
    (): Observable<Action> =>
      this.actions$.pipe(
        ofType(getSpeakers),
        mergeMap((payload: { params: SpeakerParams }) =>
          this.service.getSpeakers(payload.params).pipe(
            map((speakerList: ISpeakerList) =>
              loadSpeakersSuccess({ speakerList })
            ),
            catchError((error: HttpErrorResponse) =>
              of(loadSpeakersFailure({ error }))
            )
          )
        )
      )
  );
}
