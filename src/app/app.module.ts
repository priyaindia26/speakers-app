import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { MaterialExampleModule } from '../material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { StorageModule } from './store/storage.module';
import { SpeakerService } from './shared/speaker.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialExampleModule,
    StorageModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SpeakerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
