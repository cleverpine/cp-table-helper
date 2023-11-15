import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { PrimeNGModule } from "./primeng.module";
import { AppComponent } from './app.component';
import { GridComponent } from "./grid/grid.component";
import { ExampleTableComponent } from "./example-table/example-table.component";

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ExampleTableComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
