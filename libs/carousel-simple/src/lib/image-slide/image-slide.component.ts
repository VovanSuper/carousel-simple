import { Component, OnInit, Injector, Renderer2, ViewChild, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { slideDataToken } from '../settings/slide.provider-data';

@Component({
  selector: 'ngxd-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.scss']
})
export class ImageSlideComponent implements OnInit, AfterViewInit {
  // @ViewChild('itemHost', { read: ElementRef, static: true }) itemHost: ElementRef<HTMLDivElement>;
  // slideHost: HTMLElement = null;
  imgSrc = null;
  headingTxt = null;
  slideW = null;

  constructor(private injector: Injector, private sanitizer: DomSanitizer, private render: Renderer2) { }

  ngOnInit() {

    // this.slideHost = (<Element>this.itemHost.nativeElement).querySelector('.item-host');
    const { imgSrc, title, extras, slideW } = this.injector.get(slideDataToken);
    // this.src = this.sanitizer.bypassSecurityTrustResourceUrl(imgSrc);
    const { cb: log } = extras;
    this.imgSrc = imgSrc;
    this.headingTxt = title;
    this.slideW = slideW;
    log(this.imgSrc);
    log(this.headingTxt);
    log(slideW);
    // log('itemHost --- ', this.itemHost)
    // log('size ', getComputedStyle(this.itemHost.nativeElement).width)
    // this.render.setStyle(this.itemHost.nativeElement, 'width', this.slideW);
    // this.render.setStyle(this.itemHost.nativeElement.parentElement, 'width', this.slideW + 'px');
  }

  ngAfterViewInit() {


  }

}