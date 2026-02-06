import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { DashBoard } from './dash-board/dash-board';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Home } from './home/home';
import { Paragraph } from './paragraph/paragraph';
import { OneLine } from './one-line/one-line';
import { Mcq } from './mcq/mcq';
import { Checkbox } from './checkbox/checkbox';
import { QuestionPaper } from './service/question-paper';

@NgModule({
  declarations: [
    App,
    DashBoard,
    Home,
    Paragraph,
    OneLine,
    Mcq,
    Checkbox
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    QuestionPaper
  ],
  bootstrap: [App]
})
export class AppModule { }
