import { Component, OnInit, Injector, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { AnimationBuilder, AnimationFactory, animate, style, AnimationPlayer, AnimationOptions } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageSlideComponent } from '../image-slide/image-slide.component';
import { ISlideData, slideDataToken } from '../settings/slide.provider-data';

const l = console.log;

@Component({
  selector: 'ngxd-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  @ViewChild('cvp', { static: true }) viewPortContainer: ElementRef<HTMLElement>;
  @ViewChild('slider', { static: true }) carouselContainer: ElementRef<HTMLElement>;
  // @Input() images: string[] = [];
  slideComponents: Array<{ injector: Injector; }> = [];
  slides: ISlideData[] = [];
  currIndex = 0;
  currentDelta = 0;
  get slideCmp() {
    return ImageSlideComponent; //   || TextSlideCmp ?   -- something like that;
  }
  containerW = 0;

  constructor(
    public injector: Injector,
    public sanitizer: DomSanitizer,
    public renderer: Renderer2,
    private animationBuilder: AnimationBuilder,
  ) { }

  ngOnInit() {
    // ngAfterViewInit() {
    // this.images = (Array.from(new Array(9))).map((_, i) => require(`../assets/${i + 1}.jpeg`));
    this.containerW = this.getContainerW();
    l(this.containerW);
    // this.renderer.setStyle(this.carouselContainer.nativeElement, 'width', this.containerW * 9);
    this.slides = Array.from(new Array(9)).map((_, i) => ({
      imgSrc: `assets/${i + 1}.jpeg`,
      title: `Title ${i + 1}`,
      slideW: this.containerW,
      extras: { cb: function () { handleResize.bind(this); } }
    }));


    this.slides.forEach(({ imgSrc, title, slideW, extras }, i) => {
      const slideChildInjector = Injector.create({
        providers: [{ provide: slideDataToken, useValue: { imgSrc, title, slideW, extras } }],
        name: `imgSlideInjector${i + 1}`,
        parent: this.injector
      });
      this.slideComponents.push({ injector: slideChildInjector });
    });

    //** Window Resize Observer */
    window.addEventListener('resize', e => {
      const { innerHeight, innerWidth } = <EventTarget & { innerHeight: number | string, innerWidth: number | string; }>e.target;
      l('Window size : ', { innerHeight, innerWidth });
      l('this.viewPortContainer.nativeElement : ', {
        h: getComputedStyle(this.viewPortContainer.nativeElement).height,
        w: getComputedStyle(this.viewPortContainer.nativeElement).width
      });

    });
    // -- Window Resize end -- 
    function handleResize(e: Event) {
      l(e);
    }

  }

  slideTo(dir?: 'left' | 'right', amount = this.getContainerW()) {
    // amount = next ?  || amount;
    l('Current INDEX: ', this.currIndex);
    if ((this.currIndex >= this.slides.length - 1 && dir === 'left') || (this.currIndex <= 0 && dir === 'right')) {
      console.warn('Cannot animate ...');
      return;
    }
    this.currIndex = (dir === 'left') ? this.currIndex + 1 : this.currIndex - 1;
    // const transitionAmount = this.currIndex * amount ;
    this.currentDelta = (dir === 'left') ? this.currentDelta - amount : this.currentDelta + amount;

    const persistentTransitionValue = this.currentDelta + 'px';
    l('Transition AMOUNT ON STEP : ', persistentTransitionValue);




    // this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', `translateX(${persistentTransitionValue})`);

    // const slideAnimation = animate('2s ease-in-out', style({ transform: `{{transformParams}}` }));

    // const animFactory: AnimationFactory = this.animationBuilder.build([
    //   animate('2s', keyframes([
    //     style({ transform: `{{transformParams}}` })
    //   ]))
    // ]);
    // const animFactory: AnimationFactory = this.animationBuilder.build(slideAnimation);

    // translateX(${(dir === 'left') ? amount : -amount || -716}px)

    // const createParams = () => `translateX(${transitionValue})`;

    // const opts: AnimationOptions = {
    //   params: {
    //     transformParams: createParams()
    //   }
    // };
    // const player: AnimationPlayer = animFactory.create(this.carouselContainer.nativeElement, opts);

    // player.play();
    // player.onStart(() => {
    //   // this.renderer.removeStyle(this.carouselContainer.nativeElement, 'transform');
    // });
    // player.onDone(() => {
    //   // this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', 'none');
    //   // this.renderer.setStyle(this.carouselContainer.nativeElement, 'offset', 'none');
    //   this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', `translate(${transitionValue})`);
    //   player.destroy();
    // });

    // player.play();

    const keyFrames: Keyframe[] = [{ transform: `translateX(${(dir === 'left' ? - amount : amount)}px)` }];
    const keyFramesAnimOpts: KeyframeAnimationOptions = {
      duration: 1500,
      fill: 'forwards',
      easing: 'ease-in-out',
      composite: 'accumulate',
    };
    const anim: Animation = this.carouselContainer.nativeElement.animate(keyFrames, keyFramesAnimOpts);
    anim.finished.then((_anim: Animation & { persist?: () => void; commitStyles?: () => void; }) => {
      if (_anim['persist']) { _anim.persist(); }
      else if (_anim['commitStyles']) { _anim.commitStyles(); }
      // else
        // this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', `translateX(${persistentTransitionValue})`);
    });

  }

  private getContainerW = () => this.viewPortContainer.nativeElement.getBoundingClientRect().width;
  // private getContainerW = () => this.viewPortContainer.nativeElement.offsetWidth;

  // slideTo(itemIndex: number) {
  // Basically, the distance between two positions of the slider-container (the current and next);
  // for that: get current index of slide in viewport, get the next slide index (slide to which container to be animated to),
  // distance in px could be found by multiplication of quantity of slides to animated between (current slide - next slide) and a slide width
  // }

  // private getElIndex(element: HTMLDListElement) {
  // return this.slideComponents.indexOf(element);
  // }

}
