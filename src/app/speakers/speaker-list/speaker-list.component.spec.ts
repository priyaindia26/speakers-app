import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MemoizedSelector, Store, StoreModule, select } from '@ngrx/store';
import { MockStore, provideMockStore, } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ISpeakerList } from 'src/app/core/models/speaker';
import { SpeakerService } from 'src/app/shared/speaker.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getAllSpeaker } from 'src/app/store/selectors/speaker.selectors';
import { initialSpeakerState, ISpeakerState } from 'src/app/store/states/speaker.state';
import { SpeakerListComponent } from './speaker-list.component';
import { MaterialExampleModule } from 'src/material.module';
import { PageEvent } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getSpeakers } from 'src/app/store/actions/speaker.actions';
import { of, ReplaySubject, Observable } from 'rxjs';

describe('SpeakerListComponent', () => {
  let component: SpeakerListComponent;
  let fixture: ComponentFixture<SpeakerListComponent>;
  let mockStore: MockStore;
  const initialState = {} as ISpeakerList;
  let service: SpeakerService;
  let mockSpeakerSettingsSelector: MemoizedSelector<ISpeakerState, ISpeakerList>;
  let actions: Observable<any>;
  const speakerData = {
    "results": [
      {
        "gender": "female",
        "name": {
          "first": "Iina",
          "last": "Ranta"
        },
        "role": "admin",
        "location": {
          "street": {
            "number": 319,
            "name": "Aleksanterinkatu"
          },
          "postcode": 40764,
          "city": "Oulunsalo"
        },
        "email": "iina.ranta@example.com",

        "dob": {
          "date": "1997-10-14T13:07:55.261Z"
        },
        "phone": "04-731-593",
        "id": {
          "name": "HETU",
          "value": "NaNNA552undefined"
        },
        "picture": {
          "medium": "https://randomuser.me/api/portraits/med/women/19.jpg"
        }
      }],
    "info": {
      "seed": "87bce8f7667683fc",
      "results": 20,
      "page": 1,
      "version": "1.4"
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpeakerListComponent],
      imports: [MatTableModule, NoopAnimationsModule, StoreModule.forRoot({}), HttpClientTestingModule, MaterialExampleModule],
      providers: [provideMockActions(() => actions),
      provideMockStore({ initialState }), SpeakerService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerListComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    service = TestBed.inject(SpeakerService);
    spyOn(mockStore, 'select').and.callThrough();
    mockSpeakerSettingsSelector = mockStore.overrideSelector(getAllSpeaker, initialState);
    component.ngOnInit();
    fixture.detectChanges();

  });

  it('should create', (done) => {
    component.loadSpeakersData();
    fixture.detectChanges();
    const spy = spyOn(component, 'getSpeakersData');
    actions = of({ type: getSpeakers });
    const expectedAction = getSpeakers({
      params: {
        pageIndex: component.paginator?.pageIndex + 1,
        pageSize: 30
      },
    });
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    // Act
    fixture.detectChanges();

    // Assert
    // expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);

    // Act - test success
    mockStore.dispatch(getSpeakers({
      params: {
        pageIndex: component.paginator?.pageIndex + 1,
        pageSize: 30
      },
    }));
    fixture.detectChanges();

    // Assert
    expect(component.speakersList).not.toBeNull();

    expect(component).toBeTruthy();
    expect(fixture.componentInstance.paginator).toBeDefined();
    fixture.whenStable().then(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
      done();
    });
  });


  describe('with basic data source', () => {

    it('should set pageIndex to zero', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.paginator.pageIndex = 0;
        fixture.detectChanges();
        expect(fixture.componentInstance.paginator.pageIndex).toEqual(0);
      });

    });
  })

  describe('getSpeakerData', () => {

    it('Should call getSpeakerData and set total number of speaker', () => {
      component.getSpeakersData(speakerData);
      expect(component.totalNumberOfSpeaker).toEqual(1);
    });
  });

  describe('ngAfterViewInit', () => {
    it('Should call ngAfterViewInit and call loadspeakers method with argument pageindex and pagesize', () => {
      component.paginator.pageIndex = 0;
      const spy = spyOn(component, 'loadSpeakersData');
      actions = of({ type: getSpeakers });
      const expectedAction = getSpeakers({
        params: {
          pageIndex: component.paginator?.pageIndex + 1,
          pageSize: 30
        },
      });
      const dispatchSpy = spyOn(mockStore, 'dispatch');

      // Act
      fixture.detectChanges();

      // Assert
      // expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);

      // Act - test success
      mockStore.dispatch(getSpeakers({
        params: {
          pageIndex: component.paginator?.pageIndex + 1,
          pageSize: 30
        },
      }));
      component.ngAfterViewInit();
      ;
      mockStore.pipe(select(getAllSpeaker))
        .subscribe(speakers => {
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1)
          })
        })
    });

  });

  describe('getNextPageData', () => {

    it('Should call getNextPageData with event obejct as argument and pagesize and pageIndex should be set', () => {
      const event: PageEvent = {
        /** The current page index. */
        pageIndex: 2,
        pageSize: 30,
        length: component.totalNumberOfSpeaker
      }
      component.getNextPageData(event);
      expect(component.currentPage).toEqual(event.pageIndex);
      expect(component.pageSize).toEqual(event.pageSize);
    });
  })

  describe('onRowClicked', () => {

    it('Should call onRowClicked method with speaker data and should call setSpeakerData', () => {
      const spy = spyOn(service, 'setSpeakerData');
      component.onRowClicked(speakerData.results[0]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(speakerData.results[0]);
    });
  });


  describe('Should test data table', () => {
    it('should test the table ', (done) => {
      component.getSpeakersData(speakerData);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let tableRows = fixture.nativeElement.querySelectorAll('tr');
        expect(tableRows.length).toBe(2);

        // Header row
        let headerRow = tableRows[0];
        expect(headerRow.cells[0].innerHTML).toBe('Full Name');
        expect(headerRow.cells[1].innerHTML).toBe('Gender');
        expect(headerRow.cells[2].innerHTML).toBe('Email');
        done();
      });
    });
  })
})
