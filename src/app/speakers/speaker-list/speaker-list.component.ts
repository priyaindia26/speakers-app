import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from "@ngrx/store";
import { Observable, Subject, Subscription } from "rxjs";

import { getAllSpeaker } from 'src/app/store/selectors/speaker.selectors';
import { SpeakerService } from 'src/app/shared/speaker.service';
import { ISpeakerState } from 'src/app/store/states/speaker.state';
import { ISpeakerList, ISpeaker } from 'src/app/core/models/speaker';
import { getSpeakers } from 'src/app/store/actions/speaker.actions';



@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.css']
})
export class SpeakerListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  pageSize = 5;
  currentPage = 0;
  public totalNumberOfSpeaker: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  public noData: ISpeaker[] = [<ISpeaker>{}];
  public loading: boolean;
  public error$: Observable<boolean>;
  public filterSubject = new Subject<string>();
  public subscription: Subscription = new Subscription();

  displayedColumns: string[] = ['fullName', 'gender', 'email', 'phone', 'actions'];
  speakersList: MatTableDataSource<ISpeaker> = new MatTableDataSource();


  constructor(public store: Store<ISpeakerState>, private router: Router, private service: SpeakerService) { }

  ngOnInit(): void {
    this.store
      .pipe(select(getAllSpeaker))
      .subscribe((speakers) => this.getSpeakersData(speakers));
  }

  getSpeakersData(speakers: ISpeakerList): void {
    if (Object.keys(speakers).length) {
      this.speakersList = new MatTableDataSource(
        speakers.results.length ? speakers.results : this.noData
      );
      this.totalNumberOfSpeaker = speakers.results.length;
      this.speakersList.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.loadSpeakersData();
  }

  loadSpeakersData(): void {
    this.store.dispatch(
      getSpeakers({
        params: {
          pageIndex: this.paginator?.pageIndex + 1,
          pageSize: 30
        },
      })
    );
  }

  getNextPageData(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.speakersList.filter = filterValue.trim().toLowerCase();
    if (this.speakersList.paginator) {
      this.speakersList.paginator.firstPage();
    }
  }

  onRowClicked(row: ISpeaker): void {
    this.service.setSpeakerData(row);
    this.router.navigateByUrl('/viewPage');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  retry(): void {
    this.loadSpeakersData();
  }
}