import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarouselSimpleModule } from '@ngx-simple/carousel-simple';
import { CarouselTestComponent } from './carousel-test.component';

const testRoutes: Routes = [
  { path: '', component: CarouselTestComponent }
];

@NgModule({
  imports: [
    CarouselSimpleModule,
    RouterModule.forChild(testRoutes)
  ],
  declarations: [CarouselTestComponent],
})
export class CarouselTestModule { }