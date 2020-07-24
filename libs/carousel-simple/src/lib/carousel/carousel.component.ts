import { Component, OnInit, Type, Injector, InjectionToken, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSlideComponent } from '../image-slide/image-slide.component';

export const slideDataToken = new InjectionToken<ISlide>('slideData');
export interface ISlide {
  imgSrc: string;
  title: string;
}

@Component({
  selector: 'ngxd-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  // @Input() images: string[] = [];
  slideComponents: Array<{ injector: Injector; }> = [];
  slides: ISlide[] = [];
  get SlideCmp() {
    return ImageSlideComponent;
  }

  constructor(public injector: Injector, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    // this.images = (Array.from(new Array(9))).map((_, i) => require(`../assets/${i + 1}.jpeg`));
    this.slides = (Array.from(new Array(9))).map((_, i) => ({
      imgSrc: ` assets/${i + 1}.jpeg`,
      title: `Title ${i + 1}`
    }));

    this.slides.forEach(({ imgSrc, title }, i) => {
      const slideChildInjector = Injector.create({
        providers: [{
          provide: slideDataToken, useValue: { imgSrc, title }
        }],
        name: `imgSlideInjector${i + 1}`,
        parent: this.injector
      });
      this.slideComponents.push({ injector: slideChildInjector });
    });
  }

  slideTo(currEl: HTMLDivElement, next?: HTMLElement, dir?: 'left' | 'right', amount?: number) {
    const keyFrames: Keyframe[] = [
      { transform: `translateX(${(dir === 'left') ? amount : amount || -716}px)` }
    ];
    let anim = currEl.animate([...keyFrames], { duration: 1000, composite: 'accumulate', fill: 'forwards' });
    // anim.addEventListener('finish', e => {
    //   const el: HTMLElement = e.target as HTMLElement;
    //   // currEl.style.left = '-450px';
    //   console.log(anim['commitStyles']);
    //   (<any>anim).commitStyles();
    // });
    anim.finished.then(_ => anim['persist'] && (<any>anim).persist());
  }

}
