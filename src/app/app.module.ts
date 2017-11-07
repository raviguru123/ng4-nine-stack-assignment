import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRouting} from './app-routing.module';
import { Task2Component } from './task2/task2.component';
import { Task1Component } from './task1/task1.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting
  ],
  declarations: [
    AppComponent,
    Task2Component,
    Task1Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
