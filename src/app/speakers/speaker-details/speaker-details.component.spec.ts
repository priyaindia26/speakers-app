import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ISpeaker } from 'src/app/core/models/speaker';
import { SpeakerService } from 'src/app/shared/speaker.service';

import { SpeakerDetailsComponent } from './speaker-details.component';

describe('SpeakerDetailsComponent', () => {
  let component: SpeakerDetailsComponent;
  let fixture: ComponentFixture<SpeakerDetailsComponent>;
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
       
        "picture": {
          "medium": "https://randomuser.me/api/portraits/med/women/19.jpg"
        },
        'id': { 'name': 'sret', 'value': 'string' }
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
      imports: [HttpClientTestingModule],
      declarations: [SpeakerDetailsComponent],
      providers: [SpeakerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerDetailsComponent);
    component = fixture.componentInstance;
    component.speakerData = speakerData.results[0];
    fixture.detectChanges();
  });

  it('should create', () => {
   
    expect(component).toBeTruthy();
  });
});
