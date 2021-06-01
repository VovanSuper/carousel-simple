import { render, screen, fireEvent } from '@testing-library/angular';

import { CarouselComponent } from './carousel.component';

test('render a Carousel component to the screen', async () => {
  await render(CarouselComponent);

  expect(CarouselComponent).toBeTruthy();
});


