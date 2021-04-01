import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselComponent } from './carousel/carousel.component';
import { ImageSlideComponent } from './image-slide/image-slide.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarouselComponent, ImageSlideComponent],
  exports: [CarouselComponent],
})
export class CarouselSimpleModule { }
