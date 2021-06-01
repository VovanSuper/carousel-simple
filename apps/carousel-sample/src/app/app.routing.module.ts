import { NgModule } from '@angular/core';

import { RouterModule, Routes, LoadChildrenCallback as LoadChildrenCb } from '@angular/router';
// import { CarouselTestComponent } from './carousel-test/carousel-test.component';

let testRoutesResolverF: LoadChildrenCb = async () => (await import('./carousel-test/carousel-test.module')).CarouselTestModule;

export const routes: Routes = [
  { path: '', loadChildren: testRoutesResolverF }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
