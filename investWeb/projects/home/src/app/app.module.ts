import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SummaryComponent } from './ui/components/summary/summary.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SummaryComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
