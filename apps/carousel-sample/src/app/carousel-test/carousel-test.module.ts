import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CarouselTestComponent } from './carousel-test.component';
import { CarouselSimpleModule } from '@ngx-simple/carousel-simple';

const testRoutes: Routes = [
  { path: '', component: CarouselTestComponent }
];

@NgModule({
  imports: [
    CommonModule,
    CarouselSimpleModule,
    RouterModule.forChild(testRoutes)
  ],
  declarations: [CarouselTestComponent],
})
export class CarouselTestModule { }