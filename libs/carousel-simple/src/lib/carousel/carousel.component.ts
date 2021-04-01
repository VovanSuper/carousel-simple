import { Component, OnInit, Type, Injector, InjectionToken, ElementRef, AfterViewInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { AnimationBuilder, AnimationFactory, animate, keyframes, style, AnimationPlayer, useAnimation } from '@angular/animations';
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
  get SlideCmp() {
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
      const { innerHeight, innerWidth } = e.target as any;
      l('Window size : ', { innerHeight, innerWidth });
      l('this.viewPortContainer.nativeElement : ', { h: getComputedStyle(this.viewPortContainer.nativeElement).height, w: getComputedStyle(this.viewPortContainer.nativeElement).width });

    });
    // -- Window Resize end -- 
    function handleResize(e) {

    }

  }

  slideTo(dir?: 'left' | 'right', amount = this.getContainerW()) {
    // amount = next ?  || amount;
    this.currIndex = dir === 'left' ? this.currIndex - 1 : this.currIndex + 1;
    l('Current INDEX: ', this.currIndex);
    const animIndex = this.currIndex + 0;
    const transitionAmount = animIndex * amount;
    const transitionValue = dir === 'left' ? transitionAmount + 'px' : '-' + transitionAmount + 'px';
    l('Transition AMOUNT ON STEP : ', transitionAmount);

    // const keyFrames: Keyframe[] = [
    //   { transform: transitionValue }
    // ];


    const slideAnimation = animate('2s ease-in-out', style({ transform: `{{transformParams}}` }));

    // const animFactory: AnimationFactory = this.animationBuilder.build([
    //   animate('2s', keyframes([
    //     style({ transform: `{{transformParams}}` })
    //   ]))
    // ]);
    const animFactory: AnimationFactory = this.animationBuilder.build(slideAnimation);

    // translateX(${(dir === 'left') ? amount : -amount || -716}px)

    const createParams = () => {
      return `translateX(${transitionValue})`;
    };

    const player: AnimationPlayer = animFactory.create(this.carouselContainer.nativeElement, {
      params: {
        'transformParams': createParams()
      }
    });

    player.play();
    player.onStart(() => l('starting animation ', player));
    player.onDone(() => {
      // this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', 'none');
      // this.renderer.setStyle(this.carouselContainer.nativeElement, 'offset', 'none');
      this.renderer.setStyle(this.carouselContainer.nativeElement, 'transform', `translate(${transitionValue})`);
      player.destroy();
    });

    player.play();
    // const anim: Animation = this.carouselContainer.nativeElement.animate([...keyFrames], { duration: 1000, composite: 'accumulate', fill: 'forwards' });
    // anim.addEventListener('finish', e => {
    //   const el: HTMLElement = e.target as HTMLElement;
    //   // currEl.style.left = '-450px';
    //   console.log(anim['commitStyles']);
    //   (<any>anim).commitStyles();
    // });
    // anim.finished.then(_anim => _anim['persist'] && (<any>_anim).persist());
  }

  private getContainerW = () => (this.viewPortContainer.nativeElement.getBoundingClientRect().width);

  // slideTo(itemIndex: number) {
  // Basically, the distance between two positions of the slider-container (the current and next);
  // for that: get current index of slide in viewport, get the next slide index (slide to which container to be animated to),
  // distance in px could be found by multiplication of quantity of slides to animated between (current slide - next slide) and a slide width
  // }

  private getElIndex(element: HTMLDListElement) {
    // return this.slideComponents.indexOf(element);
  }

}
