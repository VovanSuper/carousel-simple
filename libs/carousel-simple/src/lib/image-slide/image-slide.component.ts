import { Component, OnInit, Injector } from '@angular/core';
import { slideDataToken } from '../carousel/carousel.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngxd-image-slide',
  templateUrl: './image-slide.component.html',
  styleUrls: ['./image-slide.component.scss']
})
export class ImageSlideComponent implements OnInit {
  imgSrc = null;
  headingTxt = null;

  constructor(private injector: Injector, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const { imgSrc, title } = this.injector.get(slideDataToken);
    // this.src = this.sanitizer.bypassSecurityTrustResourceUrl(imgSrc);
    this.imgSrc = imgSrc;
    this.headingTxt = title;
    console.log(this.imgSrc);
    console.log(this.headingTxt);
  }

}