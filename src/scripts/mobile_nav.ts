import { fromEvent, switchMap, tap, throttleTime } from "rxjs";

const HEADER_SELECTOR = 'header';
const UPPER_MOBILE_HEADER_SELECTOR = 'header > .container > .upper';
const HOME_LINK_CONTAINER_SELECTOR = 'header > .container > .upper > a.logo';
const NAV_SELECTOR = 'header > .container > nav';
const DOES_MOBILE_NAV_START_CLOSED = false;

let headerRef: HTMLElement;
let upperMobileHeaderRef: HTMLElement;
let homeLinkContainerRef: HTMLAnchorElement;
let navRef: HTMLElement;
let navToggleButtonRef: HTMLButtonElement;
let isNavVisible = true;

fromEvent(document, 'DOMContentLoaded').pipe(
  tap(() => {
    headerRef = document.querySelector(HEADER_SELECTOR) as HTMLElement;
    upperMobileHeaderRef = document.querySelector(UPPER_MOBILE_HEADER_SELECTOR) as HTMLElement;
    homeLinkContainerRef = document.querySelector(HOME_LINK_CONTAINER_SELECTOR) as HTMLAnchorElement;
    navRef = document.querySelector(NAV_SELECTOR) as HTMLElement;
  }),
  tap(() => {
    navToggleButtonRef = createNavToggleButton();
    homeLinkContainerRef.after(navToggleButtonRef);
  }),
  tap(() => {
    headerRef.classList.remove('border-t-2', 'border-slate-900')
    headerRef.classList.add('md:border-t-2', 'md:border-slate-900')
    upperMobileHeaderRef.classList.add('z-30', 'flex', 'bg-slate-100', 'dark:bg-slate-600', 'border-t-2', 'border-slate-900', 'md:border-none');
    homeLinkContainerRef.classList.remove('mx-auto');
    homeLinkContainerRef.classList.add('mr-auto');
    navRef.classList.add('z-10', 'flex', 'flex-col', 'duration-300', 'border-b-4', 'border-gray-100', 'dark:border-gray-700', 'bg-gray-100', 'dark:bg-gray-700', 'md:z-0', 'md:mt-0', 'md:border-none', 'md:bg-transparent');
  }),
  tap(() => {
    if (DOES_MOBILE_NAV_START_CLOSED) {
      toggleNav();
    }
  }),
  switchMap(() => fromEvent(navToggleButtonRef, 'click').pipe(
    throttleTime(150),
    tap(toggleNav)
  ))
).subscribe();

function createNavToggleButton() {
  const bareButton = document.createElement('button');
  return {
    ...bareButton,
    type: 'button',
    className: 'z-30 duration-300 h-full p-4 bg-gray-100 dark:bg-gray-700 md:hidden',
    ariaLabel: 'Ir a...',
    innerHTML: '<img class="icon w-4 dark:invert" alt="bars" src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/svgs/solid/bars.svg" />'
  } as HTMLButtonElement;
}

function toggleNav() {
  navRef.classList.toggle('mt-[-100%]');
  for (const c of ['bg-gray-100', 'dark:bg-gray-700']) {
    navRef.classList.toggle(c);
    navToggleButtonRef.classList.toggle(c);
  }
  isNavVisible = !isNavVisible;
}
