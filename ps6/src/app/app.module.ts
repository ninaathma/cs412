import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';
import { DataService } from './data.service'; // Import the service

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataService, // Provide the service here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
