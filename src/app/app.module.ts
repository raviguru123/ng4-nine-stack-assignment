import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {AppRouting} from './app-routing.module';
import { Task2Component } from './task2/task2.component';
import { Task1Component } from './task1/task1.component';
import {TweetService} from './tweet.service';
import {SearchPipe} from './task1/search.pipe';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting
  ],
  declarations: [
    AppComponent,
    Task2Component,
    Task1Component,
    SearchPipe
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
