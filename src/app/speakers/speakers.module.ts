import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialExampleModule } from 'src/material.module';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { SpeakerDetailsComponent } from './speaker-details/speaker-details.component';

const routes: Routes = [
  { path: 'listPage', component: SpeakerListComponent },
  { path: 'viewPage', component: SpeakerDetailsComponent },
  { path: '', redirectTo: '/listPage', pathMatch: 'full' }, // redirect to `listPage`
  // { path: '**', component: PageNotFoundComponent }  Wildcard route for a 404 page
];



@NgModule({
  declarations: [SpeakerListComponent, SpeakerDetailsComponent],
  providers: [],
  imports: [RouterModule.forChild(routes), MaterialExampleModule, FormsModule, CommonModule
  ],
  exports: [RouterModule]
})

export class SpeakersModule { }
