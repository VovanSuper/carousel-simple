import { InjectionToken, inject } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { filter, map, tap } from 'rxjs/operators';

/**
 * It is the same token like in a sample with useFactory but
 * it is implemented an another way.
 *
 * This time we do not need to provide it directly in 'providers' array
 */
export const PRESSED_KEY = new InjectionToken<Observable<string>>(
  'Keyboard press stream',
  {
    /**
     * When a component asks for a PRESSED_KEY the first time,
     * the factory called once
     */
    factory: () => {
      /**
       * Use 'inject' function from @angular/core to use
       * data from other tokens here
       */
      const documentRef = inject(DOCUMENT);

      return fromEvent(documentRef.body, 'keydown').pipe(
        tap((e: KeyboardEvent) => console.log(e['key'])),
        map((event: KeyboardEvent) => event.key)
      );
    }
  }
);

export enum LEFT_RIGHT {
  LEFT = 'ArrowLeft',
  RIGHT = 'ArrowRight'
}

export enum UP_DOWN {
  UP = 'ArrowUp',
  DOWN = 'ArrowDown'
}

export const LEFT_RIGHT_KEY = new InjectionToken<Observable<LEFT_RIGHT>>(
  'Keyboard left right keys presses',
  {
    factory: () => {
      const documentRef = inject(DOCUMENT);

      return fromEvent(documentRef.body, 'keydown').pipe(
        filter((e: KeyboardEvent) => e.code.toLowerCase() === LEFT_RIGHT.LEFT || e.code.toLowerCase() === LEFT_RIGHT.RIGHT),
        map(e => e.code as LEFT_RIGHT)
      );
    }
  }
);

export const UP_DOWN_KEY = new InjectionToken<Observable<UP_DOWN>>(
  'Keyboard left right keys presses',
  {
    factory: () => {
      const documentRef = inject(DOCUMENT);

      return fromEvent(documentRef.body, 'keydown').pipe(
        filter((e: KeyboardEvent) => e.code.toLowerCase() === UP_DOWN.DOWN || e.code.toLowerCase() === UP_DOWN.UP),
        map(e => e.code as UP_DOWN)
      );
    }
  }
);
