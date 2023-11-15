import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [],
  imports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    MultiSelectModule,
  ],
  exports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    MultiSelectModule,
  ],
  providers: [],
})
export class PrimeNGModule {}
