import { fromEvent, switchMap, takeUntil } from "rxjs";
import { SplideMetadata, startSplides } from "../../lib/splides";

const ELEMENTS: SplideMetadata[] = [
  {
    query: '#facade .splide'
  }
];

fromEvent(document, 'DOMContentLoaded').pipe(
  switchMap(() => startSplides(ELEMENTS)),
  takeUntil(fromEvent(document, 'beforeunload'))
).subscribe();
