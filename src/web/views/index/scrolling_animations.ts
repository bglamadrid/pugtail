import { fromEvent, switchMap, takeUntil, tap } from "rxjs";
import { AnimatedElementPartialMetadata, startAnimations } from "../../lib/scrolling_animations";

const ELEMENTS: AnimatedElementPartialMetadata[] = [
  {
    query: '#contact form'
  }
];
const THROTTLE_INTERVAL = 200;

fromEvent(document, 'DOMContentLoaded').pipe(
  switchMap(() => startAnimations(ELEMENTS, THROTTLE_INTERVAL)),
  takeUntil(fromEvent(document, 'beforeunload'))
).subscribe();
