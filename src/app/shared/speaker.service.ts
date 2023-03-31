import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpeakerParams } from '../core/models/speaker-params';
import { ISpeakerList, ISpeaker } from '../core/models/speaker';

@Injectable()
export class SpeakerService {

  constructor(private http: HttpClient) { }

  private api_URL = 'https://randomuser.me/api/?results=';
  private speakerData$: BehaviorSubject<any> = new BehaviorSubject(null);


  getSpeakers(params: SpeakerParams): Observable<ISpeakerList> {
    return this.http.get<ISpeakerList>(`${this.api_URL}${params.pageSize}&page=${params.pageIndex}`);
  }

  getSpeakerData(): Observable<ISpeaker> {
    return this.speakerData$.asObservable();
  }

  setSpeakerData(profile: ISpeaker) {
    this.speakerData$.next(profile);
  }
}
