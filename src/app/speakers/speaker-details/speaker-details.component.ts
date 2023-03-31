import { Component, OnInit } from '@angular/core';

import { ISpeaker } from 'src/app/core/models/speaker';
import { SpeakerService } from '../../shared/speaker.service';

@Component({
  selector: 'app-speaker-details',
  templateUrl: './speaker-details.component.html',
  styleUrls: ['./speaker-details.component.css']
})
export class SpeakerDetailsComponent implements OnInit {

  constructor(private service: SpeakerService) { 
    this.service.getSpeakerData().subscribe(speakerData => { 
      this.speakerData = speakerData;
     });
  }
  speakerData: ISpeaker;


  ngOnInit(): void {
   
    
  }


}
