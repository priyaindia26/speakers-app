import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ISpeakerList } from '../core/models/speaker';

import { SpeakerService } from './speaker.service';

let service: SpeakerService;
let httpTestingController: HttpTestingController;
const url = 'https://randomuser.me/api/?results=30&page=0';
const params = {
  pageIndex: 0,
  pageSize: 30
};
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
const returnedData: ISpeakerList = {} as ISpeakerList;
describe('SpeakerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpeakerService]
    })
    httpTestingController = TestBed.inject(HttpTestingController)

    service = TestBed.inject(SpeakerService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });





  describe('SpeakerService', () => {
    it('#getData should return expected data', (done) => {

      service.getSpeakers(params).subscribe(data => {
        expect(data).toEqual(speakerData);
        done();
      });
      const testRequest = httpTestingController.expectOne(url);
      testRequest.flush(speakerData);
    });

  });

  describe('SpeakerService', () => {
    it('#getSpeakerData should use GET to retrieve data', () => {
      service.getSpeakers(params).subscribe();

      const testRequest = httpTestingController.expectOne(url);

      expect(testRequest.request.method).toEqual('GET');
    });
  });

  describe('SpeakerService', () => {
    it('#getSpeakerData should get data', (done) => {
      service.getSpeakers(params).subscribe(data => {
        expect(data).not.toEqual(speakerData);
        done();
      });

      const testRequest = httpTestingController.expectOne(url);

      testRequest.flush(returnedData);
    });
  });

  describe('getSpeakers', () => {
    it('#getSpeakers should return an empty object on error', () => {
      const expectedData: ISpeakerList = {} as ISpeakerList;

      service.getSpeakers(params).subscribe(data => fail('Should have failed with 500 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(500);
          expect(error.error).toContain('error');
        });

      const testRequest = httpTestingController.expectOne(url);
      testRequest.flush('error', { status: 500, statusText: 'Broken Service' });

    });
  });


});
