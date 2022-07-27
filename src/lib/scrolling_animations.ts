import { from, fromEvent, merge, of, Subject, timer } from "rxjs";
import { filter, finalize, map, mergeMap, switchMap, takeUntil, takeWhile, tap, throttleTime, toArray } from "rxjs/operators";

const DEFAULTS = {
  THROTTLE_INTERVAL: 100,
  ANIMATION_TIME: '1s',
  ANIMATION_NAME: 'fadeInUp',
  SCREEN_OFFSET_RATIO: 0.9
};
const ANIMATE_CSS_REQUIRED_CLASSES = ['animate__animated'];
const animateCssClassFromName = (animationName: string) => `animate__${animationName}`;

export interface AnimatedElementPartialMetadata {
  query: string;
  animationName?: string;
  animationDuration?: string;
}

/**
 * One-stop-shop RxJS function to create asynchronous document-scroll-event-triggered animations.
 * @param inputMetadata Information about the elements to be animated
 * @param throttleInterval Optionally, the least amount of time to wait between each check
 * @returns An observable that, upon subscription, will hide the elements and
 * setup the desired animations to be triggered later (or inmediately if the user already has scrolled down enough).
 *
 * It will emit the metadata of every animated element whenever they are triggered.
 *
 * It will inmediately complete once all element animations have been triggered.
 */
export function startAnimations(
  inputMetadata: AnimatedElementPartialMetadata[],
  throttleInterval?: number,
  debugging = false
) {
  const elementScrollingAreaOffsetY = (getViewportHeight() * DEFAULTS.SCREEN_OFFSET_RATIO);
  const cyclicCheckThrottleMs = throttleInterval || DEFAULTS.THROTTLE_INTERVAL;
  return from(inputMetadata).pipe(
    switchMap(metadata => convertPartialToFullMetadata(metadata, elementScrollingAreaOffsetY).pipe(
      tap(prepareElementForAnimation)
    )),
    toArray(),
    map(array => array.sort(
      (a, b) => (a.minWindowScrollY - b.minWindowScrollY)
    )),
    map(array => new ScrollingAnimationsManager(array)),
    switchMap(manager => (
      merge(
        timer(cyclicCheckThrottleMs), // early trigger
        fromEvent(document, 'scroll')
      ).pipe(
        throttleTime(cyclicCheckThrottleMs),
        takeUntil(manager.noAnimationsLeft$),
        tap(() => {
          if (debugging) { console.log('initiating cyclic check for elements to be animated...'); }
        }),
        mergeMap(() => manager.checkTriggeredElements().pipe(
          tap(elem => {
            if (debugging) { console.log('animating an element: ', elem); }
          }),
          finalize(() => {
            if (debugging) { console.log('cyclic check done'); }
          })
        ))
      )
    ))
  );
}

function getViewportHeight() {
  return Math.max(document.documentElement.clientHeight || 0,
                  window.innerHeight || 0);
}

function convertPartialToFullMetadata(
  input: AnimatedElementPartialMetadata,
  scrollingAreaOffsetY: number
) {
  return of(document.querySelector(input.query)).pipe(
    filter(element => !!element),
    map(element => element as HTMLElement),
    map(element => ({
      query: input.query,
      element: element as HTMLElement,
      animationName: input.animationName || DEFAULTS.ANIMATION_NAME,
      animationDuration: input.animationDuration || DEFAULTS.ANIMATION_TIME,
      minWindowScrollY: element.getBoundingClientRect().top - scrollingAreaOffsetY,
      triggered: false
    }) as AnimatedElementMetadata)
  );
}

function prepareElementForAnimation(metadata: AnimatedElementMetadata) {
  metadata.element.classList.add(...ANIMATE_CSS_REQUIRED_CLASSES);
  metadata.element.style.opacity = '0';
  metadata.element.style.animationDuration = metadata.animationDuration || DEFAULTS.ANIMATION_TIME;
}

function triggerAnimation(m: AnimatedElementMetadata) {
  m.element.style.opacity = '1';
  m.element.classList.add(animateCssClassFromName(m.animationName));
  m.triggered = true;
}

interface AnimatedElementMetadata
  extends AnimatedElementPartialMetadata {
  animationName: string;
  element: HTMLElement;
  minWindowScrollY: number;
  triggered: boolean;
}

class ScrollingAnimationsManager {
  readonly elements: AnimatedElementMetadata[];
  readonly periodicCheckThrottleTime = 100;
  private readonly areWeDone = new Subject<void>();
  noAnimationsLeft$ = this.areWeDone.asObservable();

  constructor(elements: AnimatedElementMetadata[]) {
    this.elements = elements;
  }

  checkTriggeredElements() {
    const currentScrollY = window.scrollY;
    return from(this.elements).pipe(
      filter(m => !m.triggered),
      takeWhile(m => (currentScrollY >= m.minWindowScrollY)),
      tap(triggerAnimation),
      finalize(() => this.updateScrollStatus())
    );
  }

  private updateScrollStatus() {
    if (this.elements.filter(e => !e.triggered).length === 0) {
      this.areWeDone.next();
      this.areWeDone.complete();
    }
  }
}
