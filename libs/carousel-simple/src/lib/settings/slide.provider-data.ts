import { InjectionToken } from '@angular/core';

export interface ISlideData {
  imgSrc: string;
  title: string;
  slideW?: number | string;
  extras?: { cb: Function; };
};

export const slideDataToken = new InjectionToken<ISlideData>('ISlideData');