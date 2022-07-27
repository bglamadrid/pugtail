import { Options, Splide } from "@splidejs/splide";
import { from, map, of, switchMap, tap, toArray } from "rxjs";

export interface SplideMetadata {
  query: string;
  options?: Options;
};

export function startSplides(splidesMetadata: SplideMetadata[]) {
  return of(void 0).pipe(
    tap(() => {
      Splide.defaults = {
        type: 'loop'
      };
    }),
    switchMap(() => from(splidesMetadata)),
    map(meta => new Splide(meta.query, meta.options)),
    tap(sp => sp.mount()),
    toArray()
  );
}
